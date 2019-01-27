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
    private static var lineNumbersColor: Color {
        return Color(red: 100/255, green: 100/255, blue: 100/255, alpha: 1.0)
    }
    
    let lineNumbersStyle: LineNumbersStyle? = LineNumbersStyle(font: Font(name: "Menlo", size: 16)!, textColor: lineNumbersColor)
    let gutterStyle: GutterStyle = GutterStyle(backgroundColor: Color(red: 21/255.0, green: 22/255, blue: 31/255, alpha: 1.0), minimumWidth: 32)
    
    var font: Font = Font(name: "Menlo", size: 15)!
    
    var backgroundColor: Color = Color(red: 31/255.0, green: 32/255, blue: 41/255, alpha: 1.0)
    
    
    func globalAttributes() -> [NSAttributedString.Key: Any] {
        
        var attributes = [NSAttributedString.Key: Any]()
        
        attributes[.font] = self.font
        attributes[.foregroundColor] = NSColor.white
        
        return attributes
    }
    
    func attributes(for token: Token) -> [NSAttributedString.Key : Any] {
        return [:]
    }
    
}
