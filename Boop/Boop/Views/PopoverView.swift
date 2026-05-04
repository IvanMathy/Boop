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
        
        self.layer?.borderWidth = 1.5
        
        self.setBackground()

        
    }
    
    func setBackground() {
        
        self.layer?.backgroundColor = ColorPair.popover.value(for: self.effectiveAppearance).cgColor
        self.layer?.borderColor = ColorPair.popoverBorder.value(for: self.effectiveAppearance).cgColor
        
    }
    
    override func viewDidChangeEffectiveAppearance() {
        super.viewDidChangeEffectiveAppearance()
        self.setBackground()
    }
}
