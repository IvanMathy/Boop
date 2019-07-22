//
//  StatusView.swift
//  Boop
//
//  Created by Ivan on 1/27/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa

@IBDesignable
class StatusView: NSView {
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
        self.wantsLayer = true
        
        self.layer?.backgroundColor = NSColor.red.cgColor
        self.layer?.cornerRadius = 5

    }

    
    
}
