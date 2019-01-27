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
    
    var enabled = true

    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupKeyHandlers()
    }
    
    func setupKeyHandlers() {
        
        var keyHandler: (_: NSEvent) -> NSEvent?
        keyHandler = {
            (_ theEvent: NSEvent) -> NSEvent in
            
            if(self.enabled){
                
                // Key codes:
                // 125 is down arrow
                // 126 is up
                // 53 is escape
                // 36 is enter

                if(theEvent.keyCode == 53){ // ESCAPE
                    
                    // Let's dismiss the popover
                    
                    self.hide()
                    
                    // Return an empty event to avoid the funk sound
                    return NSEvent()
                }
                
                
                
                if(theEvent.keyCode == 36){ // ENTER
                    
                    // Let's dismiss the popover
                    
                    self.hide()
                    
                    // Return an empty event to avoid the funk sound
                    return NSEvent()
                }
                
                
                
                
            } else {
                if(theEvent.modifierFlags.contains(NSEvent.ModifierFlags.command) && theEvent.keyCode == 11){
                    
                    self.show()
                    
                    // Return an empty event to avoid the funk sound
                    return NSEvent()
                }
            }
            
            
            return theEvent
        }
        // Creates an object we do not own, but must keep track
        // of so that it can be "removed" when we're done
        NSEvent.addLocalMonitorForEvents(matching: .keyDown, handler: keyHandler)
        
    }
    
    func show() {
        overlayView.show()
        popoverView.show()
        
        self.enabled = true
    }
    
    func hide() {
        overlayView.hide()
        popoverView.hide()
        
        self.view.window?.makeFirstResponder(self.editorView)
        self.enabled = false
    }
    
}
