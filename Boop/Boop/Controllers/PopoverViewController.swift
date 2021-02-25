//
//  PopoverViewController.swift
//  Boop
//
//  Created by Ivan on 1/27/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa
import SavannaKit
import Carbon

class PopoverViewController: NSViewController {
    
    @IBOutlet weak var overlayView: OverlayView!
    @IBOutlet weak var popoverView: PopoverView!
    @IBOutlet weak var searchField: SearchField!
    @IBOutlet weak var editorView: SyntaxTextView!
    @IBOutlet weak var statusView: StatusView!
    
    @IBOutlet weak var scriptManager: ScriptManager!
    
    @IBOutlet weak var tableView: ScriptTableView!
    @IBOutlet weak var tableHeightConstraint: NSLayoutConstraint!
    @IBOutlet weak var tableViewController: ScriptsTableViewController!
    @IBOutlet weak var appDelegate: AppDelegate!
    
    var enabled = false // Closed by default

    override func viewDidLoad() {
        super.viewDidLoad()

        // Double-click script selection
        tableView.doubleAction = #selector(runSelectedScript)

        // Dismiss popover on background view click
        overlayView.onMouseDown = { [weak self] in
            self?.hide()
        }
        
        setupKeyHandlers()
    }
    
    func setupKeyHandlers() {
        
        var keyHandler: (_: NSEvent) -> NSEvent?
        keyHandler = {
            (_ theEvent: NSEvent) -> NSEvent? in
            
            var didSomething = false
                
            if theEvent.keyCode == 53 && self.enabled { // ESCAPE
                
                // Let's dismiss the popover
                self.hide()
                
                didSomething = true
            }
            
            if theEvent.keyCode == kVK_Return && self.enabled { // ENTER

                guard self.tableViewController.selectedScript != nil else {
                    return theEvent
                }

                self.runSelectedScript()
                
                didSomething = true
            }

            let window = self.view.window
            
            if self.enabled {
                if window?.firstResponder is NSTextView &&
                    (window?.firstResponder as! NSTextView).delegate is SearchField {
                    let isControlPressed = theEvent.modifierFlags.intersection(.deviceIndependentFlagsMask) == .control
                    let isControlN = isControlPressed && theEvent.keyCode == kVK_ANSI_N
                    let isControlP = isControlPressed && theEvent.keyCode == kVK_ANSI_P

                    let isShiftPressed = theEvent.modifierFlags.intersection(.deviceIndependentFlagsMask) == .shift
                    let isTab = theEvent.keyCode == kVK_Tab
                    let isOnlyTab = isTab && !isShiftPressed
                    let isShiftTab = isShiftPressed && isTab

                    let next = isControlN || isOnlyTab
                    let pre = isControlP || isShiftTab
                    let offset = next ? 1 : (pre ? -1 : 0)
                    let newSel = IndexSet([self.tableView.selectedRow + offset])
                    self.tableView.selectRowIndexes(newSel, byExtendingSelection: false)
                    self.tableView.scrollRowToVisible(self.tableView.selectedRow)
                    
                    if next || pre {
                        didSomething = true
                    }
                }
            }

            if window?.firstResponder is NSTextView &&
                (window?.firstResponder as! NSTextView).delegate is SearchField &&
                theEvent.keyCode == kVK_DownArrow { // DOWN
                
                // Why -1? I don't know, and I don't even care.
                let indexSet = IndexSet(integer: -1)
                self.tableView.selectRowIndexes(indexSet, byExtendingSelection: false)
                window?.makeFirstResponder(self.tableView)
            }
            
            // Oh hey look now somehow it's 0.
            if window?.firstResponder is NSTableView &&
                self.tableView.selectedRow == 0 &&
                theEvent.keyCode == kVK_UpArrow { // UP
                
                window?.makeFirstResponder(self.searchField)
                // This doesn't work for some reason.
                //self.searchField.moveToEndOfLine(nil)
            }
            
            guard didSomething else {
                return theEvent
            }
            
            // Return an empty event to avoid the funk sound
            return nil
        }
        
        // Creates an object we do not own, but must keep track
        // of it so that it can be "removed" when we're done
        NSEvent.addLocalMonitorForEvents(matching: .keyDown, handler: keyHandler)
        
    }
    
    func show() {
        overlayView.show()
        popoverView.show()
        
        // FIXME: Use localized strings
        statusView.setStatus(.help("Select your action"))
        
        self.searchField.stringValue = ""
        self.tableHeightConstraint.constant = 0
        
        self.view.window?.makeFirstResponder(self.searchField)
        self.enabled = true
        
        appDelegate.setPopover(isOpen: true)
        
    }
    
    func hide() {
        overlayView.hide()
        popoverView.hide()
        
        statusView.setStatus(.normal)
        
        self.view.window?.makeFirstResponder(self.editorView.contentTextView)
        self.enabled = false
        self.tableHeightConstraint.animator().constant = 0
        
        tableViewController.results = []
        
        appDelegate.setPopover(isOpen: false)
    }
    
    func runScriptAgain() {
        self.scriptManager.runScriptAgain(editor: self.editorView)
    }

    @objc private func runSelectedScript() {
        guard let script = tableViewController.selectedScript else {
            return
        }

        // Let's dismiss the popover
        hide()

        // Run the script afterwards in case we need to show a status
        scriptManager.runScript(script, into: editorView)
    }
    
}

extension PopoverViewController: NSTextFieldDelegate {
    func controlTextDidChange(_ obj: Notification) {
        guard (obj.object as? SearchField) == searchField else {
            return
        }
        
        let results = scriptManager.search(searchField.stringValue)
        tableViewController.results = results
        
        self.tableHeightConstraint.constant = CGFloat(47 * min(5, results.count))
    }
}
