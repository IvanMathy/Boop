//
//  OverlayView.swift
//  Boop
//
//  Created by Ivan on 1/27/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa

class OverlayView: NSView {

    var onMouseDown: (() -> Void)?

    required init?(coder decoder: NSCoder) {
        super.init(coder: decoder)
        self.wantsLayer = true
        self.layer?.backgroundColor = NSColor(calibratedWhite: 0.05, alpha: 1).cgColor
        self.animator().isHidden = true
        self.alphaValue = 0;
    }
    
    
    func show() {
        
        self.animator().alphaValue = 0.6
        self.animator().isHidden = false
    }
    
    func hide() {
        
        self.animator().alphaValue = 0
        self.animator().isHidden = true
    }
    
    override func mouseDown(with event: NSEvent) {
        onMouseDown?()
    }
    
}
