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

    let appearance: NSAppearance
    
    var tabWidth: Int = 4
    
    let gutterStyle: GutterStyle = GutterStyle(
        backgroundColor: Color(red: 22/255.0, green: 22/255, blue: 22/255, alpha: 1.0),
        separatorColor: Color(red: 15/255.0, green: 15/255, blue: 15/255, alpha: 1.0),
        minimumWidth: 40)
    
    var font: Font = NSFont(name: "SFMono-Regular", size: 15) ?? Font(name: "Menlo", size: 15)!
    
    let lineNumbersStyle: LineNumbersStyle?
    
    var backgroundColor: Color {
        return ColorPair.background.value(for: appearance)
    }
    
    
    init(appearance: NSAppearance) {
        self.appearance = appearance
        lineNumbersStyle = LineNumbersStyle(font: font, textColor: Color(red: 100/255, green: 100/255, blue: 100/255, alpha: 1.0))
    }
    
    func globalAttributes() -> [NSAttributedString.Key: Any] {
        
        var attributes = [NSAttributedString.Key: Any]()
        
        attributes[.font] = self.font
        attributes[.foregroundColor] = ColorPair.body.value(for: appearance)
        
        return attributes
    }
    
    func attributes(for token: Token) -> [NSAttributedString.Key : Any] {
        
        guard let token = token as? BoopToken else {
            return [:]
        }
        
        switch token.type {
        case .comment:
            return [.foregroundColor: Colors.commentGrey]
        case .string:
            return [.foregroundColor: ColorPair.red.value(for: appearance)]
        case .attribute:
            return [.foregroundColor: Colors.cyanish]
        case .number:
            return [.foregroundColor: Colors.orangeish]
        case .extra:
            return [.foregroundColor: ColorPair.blue.value(for: appearance)]
        case .keyword:
            return [.foregroundColor: ColorPair.green.value(for: appearance)]
        }
    }
    
}
