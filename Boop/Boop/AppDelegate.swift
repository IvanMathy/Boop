//
//  AppDelegate.swift
//  Boop
//
//  Created by Ivan on 1/26/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate {

    @IBOutlet weak var window: NSWindow!
    @IBOutlet weak var popoverViewController: PopoverViewController!
    @IBOutlet weak var openPickerMenuItem: NSMenuItem!
    @IBOutlet weak var closePickerMenuItem: NSMenuItem!
    

    func applicationDidFinishLaunching(_ aNotification: Notification) {
        // Disable light mode because why in heck would you want that???
        NSApp.appearance = NSAppearance(named: .darkAqua)
        
        NSWindow.allowsAutomaticWindowTabbing = false
    }

    func applicationWillTerminate(_ aNotification: Notification) {
        // Insert code here to tear down your application
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
    }
    
    func setPopover(isOpen: Bool) {
        closePickerMenuItem.isHidden = !isOpen
        openPickerMenuItem.isHidden = isOpen
    }
}

