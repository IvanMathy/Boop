//
//  StatusView.swift
//  Boop
//
//  Created by Ivan on 1/27/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa

enum Status {
    case normal
    case help(String)
    case info(String)
    case error(String)
}

@IBDesignable
class StatusView: NSView {
    
    let transitionLength = 0.3
    let messageLength = 5.0
    
    @IBOutlet weak var textLabel: NSTextField!
    
    var queue = [Status]()
    var running = false
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
        self.wantsLayer = true
        
        self.layer?.backgroundColor = NSColor.textBackgroundColor.cgColor
        self.layer?.cornerRadius = 5
        
    }

    func setStatus(_ newStatus: Status) {
        
        switch newStatus {
        case .normal, .help(_):
            // Skip the queue for those statuses
            running = false
            queue.removeAll()
            self.updateText(newStatus)
            self.updateColor(newStatus)
        default:
            queue.append(newStatus)
            queueUpdated()
        }
        
        
    }
    
    func queueUpdated() {
        guard !running else {
            return
        }
        
        guard !queue.isEmpty else {
            running = false
            self.updateText(.normal)
            self.updateColor(.normal)
            return
        }
        
        running = true
        
        let next = queue.removeFirst()
        
        self.updateText(next)
        self.updateColor(next)
        
        DispatchQueue.main.asyncAfter(deadline: .now() + messageLength, execute: {
            self.running = false
            self.queueUpdated()
        })
    }
    
    fileprivate func updateText(_ newStatus: Status) {
        
        var text = ""
        
        switch newStatus {
        case .help(let value):
            text = value
        case .info(let value):
            text = value
        case .error(let value):
            text = value
        case .normal:
            text = "Press ⌘+B to get started"
        }
        
        self.textLabel.stringValue = text
    }
    
    fileprivate func fadeText(to alphaValue: CGFloat, completionHandler: (() -> Void)? = nil) {
        NSAnimationContext.runAnimationGroup({ (context) in
            context.duration = self.transitionLength / 2.5
            self.textLabel.animator().alphaValue = alphaValue
        }) {
            completionHandler?()
        }
    }
    
    fileprivate func updateColor(_ newStatus: Status) {
        
        var color = NSColor.textBackgroundColor
        
        switch newStatus {
        case .normal, .help(_):
            break
        case .info(_):
            color = NSColor.systemBlue
        case .error(_):
            color = NSColor.red
        }
        
        NSAnimationContext.runAnimationGroup({ (context) in
            context.duration = self.transitionLength
            self.layer?.backgroundColor = color.cgColor
        })
    }
}
