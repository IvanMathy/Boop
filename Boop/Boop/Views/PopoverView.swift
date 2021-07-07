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
        self.layer?.cornerRadius = 12.0
        self.layer?.masksToBounds = true
        
        self.layer?.borderWidth = 1
        
        self.setBackground()
        
        let dropShadow = NSShadow()
        dropShadow.shadowColor = NSColor(calibratedWhite: 0, alpha: 0.4)
        dropShadow.shadowOffset = NSMakeSize(0, -20.0)
        dropShadow.shadowBlurRadius = 15.0
        
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
    
    func setBackground() {
        
        self.layer?.backgroundColor = ColorPair.popover.value(for: self.effectiveAppearance).cgColor
        self.layer?.borderColor = ColorPair.popoverOutline.value(for: self.effectiveAppearance).cgColor
        
    }
    
    override func viewDidChangeEffectiveAppearance() {
        super.viewDidChangeEffectiveAppearance()
        self.setBackground()
    }
}
