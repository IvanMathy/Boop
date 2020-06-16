//
//  PopoverView.swift
//  Boop
//
//  Created by Ivan on 1/27/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa

class PopoverView: NSView {

    required init?(coder decoder: NSCoder) {
        super.init(coder: decoder)
        
        // UI set up
        self.wantsLayer = true
        self.layer?.cornerRadius = 8.0
        self.layer?.masksToBounds = true
        
        self.layer?.borderWidth = 1.0
        
        let dropShadow = NSShadow()
        
        setLayerColors()
        
        dropShadow.shadowOffset = NSMakeSize(0, -10.0)
        dropShadow.shadowBlurRadius = 10.0
        
        self.shadow = dropShadow
        
        self.isHidden = true
        
    }
    
    func show() {
        self.animator().alphaValue = 1
        self.animator().isHidden = false
    }
    
    func hide() {
        self.animator().alphaValue = 0
        self.animator().isHidden = true;
    }
    
    override func updateLayer() {
        setLayerColors()
    }
    
    func setLayerColors() {
        self.layer?.backgroundColor = NSColor.windowBackgroundColor.cgColor
        self.layer?.borderColor = NSColor.separatorColor.cgColor
    }
}
