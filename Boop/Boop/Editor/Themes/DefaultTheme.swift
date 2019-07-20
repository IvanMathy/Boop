//
//  DefaultTheme.swift
//  Boop
//
//  Created by Ivan on 1/26/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa
import SavannaKit

class DefaultTheme: SyntaxColorTheme {
    
    let gutterStyle: GutterStyle = GutterStyle(backgroundColor: Color(red: 22/255.0, green: 22/255, blue: 22/255, alpha: 1.0), minimumWidth: 32)
    
    var font: Font = NSFont(name: "SFMono-Regular", size: 15) ?? Font(name: "Menlo", size: 15)!
    
    let lineNumbersStyle: LineNumbersStyle?
    
    var backgroundColor: Color = Color(red: 31/255.0, green: 31/255, blue: 31/255, alpha: 1.0)
    
    
    init() {
        lineNumbersStyle = LineNumbersStyle(font: font, textColor: Color(red: 100/255, green: 100/255, blue: 100/255, alpha: 1.0))
    }
    
    func globalAttributes() -> [NSAttributedString.Key: Any] {
        
        var attributes = [NSAttributedString.Key: Any]()
        
        attributes[.font] = self.font
        attributes[.foregroundColor] = NSColor.white
        
        return attributes
    }
    
    func attributes(for token: Token) -> [NSAttributedString.Key : Any] {
        
        guard let token = token as? BoopToken else {
            return [:]
        }
        
        switch token.type {
        case .comment:
            return [.foregroundColor:NSColor.gray]
        case .string:
            return [.foregroundColor:NSColor(red:0.84, green:0.17, blue:0.20, alpha:1.0)]
        case .attribute:
            return [.foregroundColor:NSColor(red:0.58, green:0.78, blue:0.44, alpha:1.0)]
        case .number:
            return [.foregroundColor:NSColor(red:0.58, green:0.08, blue:1, alpha:1.0)]
            
        }
    }
    
}
