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
        self.animator().isHidden = true
        self.alphaValue = 0;
        
        setBackground()
    }
    
    func setBackground() {
        
        self.layer?.backgroundColor = ColorPair.overlayColor.value(for: self.effectiveAppearance).cgColor
        
        
    }
    
    
    func show() {
        
        self.animator().alphaValue = 1
        self.animator().isHidden = false
    }
    
    func hide() {
        
        self.animator().alphaValue = 0
        self.animator().isHidden = true
    }
    
    override func mouseDown(with event: NSEvent) {
        onMouseDown?()
    }
    
    override func viewDidChangeEffectiveAppearance() {
        super.viewDidChangeEffectiveAppearance()
        self.setBackground()
    }
    
}
