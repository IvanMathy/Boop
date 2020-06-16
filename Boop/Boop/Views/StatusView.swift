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
    case updateAvailable(String)
    case help(String)
    case info(String)
    case error(String)
    case success(String)
}

@IBDesignable
class StatusView: NSView {
    
    let transitionLength = 0.3
    let messageLength = 5.0
    
    @IBOutlet weak var textLabel: NSTextField!
    @IBOutlet weak var updateLabel: UpdateTextField!
    
    var queue = [Status]()
    var running = false
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
        self.wantsLayer = true
    }

    func setStatus(_ newStatus: Status) {
        
        switch newStatus {
        case .normal, .help(_), .updateAvailable:
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
        
        self.updateLabel.isHidden = true
        
        switch newStatus {
        case .help(let value):
            text = value
        case .info(let value):
            text = value
        case .error(let value):
            text = value
        case .success(let value):
            text = value
        case .normal:
            text = "Press ⌘+B to get started"
        case .updateAvailable(let link):
            text = "New version available! "
        
            self.updateLabel.isHidden = false
            self.updateLabel.link = link
            
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
        
        var color = NSColor.textColor
        
        switch newStatus {
        case .normal, .help(_):
            break
        case .success(_):
            color = Colors.greenButDarker
        case .info(_):
            color = Colors.blueButDarker
        case .error(_):
            color = Colors.redButDarker
        case .updateAvailable:
            color = Colors.purpleButDarker
        }
        
        NSAnimationContext.runAnimationGroup({ (context) in
            context.duration = self.transitionLength
            self.textLabel.textColor = color
        })

    }
}
