//
//  AppDelegate.swift
//  Boop
//
//  Created by Ivan on 1/26/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa
import SavannaKit

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate {

    @IBOutlet weak var window: NSWindow!
    @IBOutlet weak var openPickerMenuItem: NSMenuItem!
    @IBOutlet weak var closePickerMenuItem: NSMenuItem!
    
    @IBOutlet weak var popoverViewController: PopoverViewController!
    @IBOutlet weak var scriptManager: ScriptManager!
    @IBOutlet weak var editor: SyntaxTextView!

    // Frame auto save name for app window frame restoration.
    private static let appWindowName = "boop.app.window"
    
    func applicationWillFinishLaunching(_ notification: Notification) {
        ThemeSettingsViewController.applyTheme()
        
        NSWindow.allowsAutomaticWindowTabbing = false
        NSApp.servicesProvider = self
        
        // Restore app window frame.
        window.setFrameUsingName(AppDelegate.appWindowName)
    }

    func applicationWillTerminate(_ aNotification: Notification) {
        // Memorize app window frame for restoration.
        window.saveFrame(usingName: AppDelegate.appWindowName)
    }
    
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

    @IBAction func showPreferencesWindow(_ sender: NSMenuItem) {
        let controller = NSStoryboard.init(name: "Preferences", bundle: nil).instantiateInitialController() as? NSWindowController
        
        controller?.showWindow(sender)
        
    }
    
    // Menu Stuff
    
    @IBAction func openPickerMenu(_ sender: NSMenuItem) {
        popoverViewController.show()
    }
    
    @IBAction func closePickerMenu(_ sender: Any) {
        popoverViewController.hide()
    }
    
    @IBAction func executeLastScript(_ sender: Any) {
        popoverViewController.runScriptAgain()
    }
    
    @IBAction func reloadScripts(_ sender: Any) {
        scriptManager.reloadScripts()
    }
    
    func setPopover(isOpen: Bool) {
        closePickerMenuItem.isHidden = !isOpen
        openPickerMenuItem.isHidden = isOpen
    }

    @objc func textServiceHandler(_ pboard: NSPasteboard, userData: String, error: NSErrorPointer) {
        if let string = pboard.string(forType: NSPasteboard.PasteboardType.string) {
            editor.contentTextView.string = string
        }
    }

}

