//
//  PopoverContainerView.swift
//  Boop
//
//  Created by Ivan on 7/8/21.
//  Copyright © 2021 OKatBest. All rights reserved.
//

import Foundation
import AppKit


class PopoverContainerView: NSView {
    
    // This is a wrapper view so that the child popver actually clips
    // the contained table. The issue was the shadow is technically
    // part of the mask so rounded corners would get ignored.
    
    required init?(coder decoder: NSCoder) {
        super.init(coder: decoder)
       
        self.wantsLayer = true
        self.layer?.cornerRadius = 12.0
        
        let dropShadow = NSShadow()
        dropShadow.shadowColor = NSColor(calibratedWhite: 0, alpha: 0.45)
        dropShadow.shadowOffset = NSMakeSize(0, -20.0)
        dropShadow.shadowBlurRadius = 10.0
        
        
        self.layer?.borderWidth = 0.5
        
        self.shadow = dropShadow
        
        self.isHidden = true
        
        self.setOutline()
        
    }

    func setOutline() {
        self.layer?.borderColor = ColorPair.popoverOutline.value(for: self.effectiveAppearance).cgColor
    }
    
    override func viewDidChangeEffectiveAppearance() {
        super.viewDidChangeEffectiveAppearance()
        self.setOutline()
    }
    
    func show() {
        self.animator().alphaValue = 1
        self.animator().isHidden = false
    }
    
    func hide() {
        self.animator().alphaValue = 0
        self.animator().isHidden = true;
    }
    
}
