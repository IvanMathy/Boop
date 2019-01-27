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

    override func draw(_ dirtyRect: NSRect) {
        super.draw(dirtyRect)

        let rectanglePath = NSBezierPath(roundedRect: NSMakeRect(0, 0, 200, 20), xRadius: 5, yRadius: 5)
        NSColor.textBackgroundColor.setFill()
        rectanglePath.fill()

    }
    
}
