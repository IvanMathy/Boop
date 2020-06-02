//
//  UpdateTextField.swift
//  Boop
//
//  Created by Ivan on 6/2/20.
//  Copyright © 2020 OKatBest. All rights reserved.
//

import Foundation
import AppKit

class UpdateTextField: NSTextField {
    
    var link: String?
    
    override func awakeFromNib() {
        
        self.attributedStringValue = NSAttributedString(string: "Learn More", attributes: [
            NSAttributedString.Key.underlineStyle: NSUnderlineStyle.single.rawValue
        ])
    }
    
    override func resetCursorRects() {
        super.resetCursorRects()
        
        self.addCursorRect(self.visibleRect, cursor: .pointingHand)
    }
    
    override func mouseDown(with event: NSEvent) {
        guard let link = link, let url = URL(string: link) else {
            return
        }
        
        NSWorkspace.shared.open(url)
    }
}
