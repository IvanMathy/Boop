//
//  PopoverViewController.swift
//  Boop
//
//  Created by Ivan on 1/27/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa
import SavannaKit

class PopoverViewController: NSViewController {
    
    @IBOutlet weak var overlayView: OverlayView!
    @IBOutlet weak var popoverView: PopoverView!
    @IBOutlet weak var editorView: SyntaxTextView!
    @IBOutlet weak var searchField: SearchField!
    @IBOutlet weak var tableHeightConstraint: NSLayoutConstraint!
    @IBOutlet weak var tableView: NSTableView!
    
    var enabled = true

    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupKeyHandlers()
    }
    
    func setupKeyHandlers() {
        
        var keyHandler: (_: NSEvent) -> NSEvent?
        keyHandler = {
            (_ theEvent: NSEvent) -> NSEvent in
            
            var didSomething = false
            
            guard self.enabled else {
                if theEvent.modifierFlags.contains(NSEvent.ModifierFlags.command)
                    && theEvent.keyCode == 11 { // cmd + B
                    
                    // Open the popover
                    self.show()
                    
                    return NSEvent()
                }
                
                return theEvent
            }
                
            // Key codes:
            // 125 is down arrow
            // 126 is up
            // 53 is escape
            // 36 is enter
       
            if theEvent.keyCode == 53 { // ESCAPE
                
                // Let's dismiss the popover
                self.hide()
                
                didSomething = true
            }
            
            if theEvent.keyCode == 36 { // ENTER
                
                // Let's dismiss the popover
                self.hide()
                
                didSomething = true
            }
            
            let window = self.view.window
            
            if window?.firstResponder is NSTextView &&
                (window?.firstResponder as! NSTextView).delegate is SearchField &&
                theEvent.keyCode == 125 { // DOWN
                
                // Why -1? I don't know, and I don't even care.
                let indexSet = IndexSet(integer: -1)
                self.tableView.selectRowIndexes(indexSet, byExtendingSelection: false)
                window?.makeFirstResponder(self.tableView)
            }
            
            // Oh hey look now somehow it's 0.
            if window?.firstResponder is NSTableView &&
                self.tableView.selectedRow == 0 &&
                theEvent.keyCode == 126 { // UP
                
                window?.makeFirstResponder(self.searchField)
                self.tableView.deselectAll(self)
            }
            
            guard didSomething else {
                return theEvent
            }
            
            // Return an empty event to avoid the funk sound
            return NSEvent()
        }
        
        // Creates an object we do not own, but must keep track
        // of it so that it can be "removed" when we're done
        NSEvent.addLocalMonitorForEvents(matching: .keyDown, handler: keyHandler)
        
    }
    
    func show() {
        overlayView.show()
        popoverView.show()
        
        self.searchField.stringValue = ""
        self.tableHeightConstraint.constant = 0
        
        self.view.window?.makeFirstResponder(self.searchField)
        self.enabled = true
        
    }
    
    func hide() {
        overlayView.hide()
        popoverView.hide()
        
        self.view.window?.makeFirstResponder(self.editorView.contentTextView)
        self.enabled = false
        self.tableHeightConstraint.animator().constant = 0
    }
    
}
