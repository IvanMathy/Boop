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
    
    var tabWidth: Int = 4
    
    let redey = #colorLiteral(red: 1, green: 0.2980392157, blue: 0.4862745098, alpha: 1) // #ff4c7c
    let bluish = #colorLiteral(red: 0.5, green: 0.8870540044, blue: 1, alpha: 1) // #3586FF
    let cyanish = #colorLiteral(red: 0.1595847315, green: 0.951053901, blue: 0.7986315017, alpha: 1) // #4cffb2
    let greenish = #colorLiteral(red: 0.6049238592, green: 1, blue: 0, alpha: 1) // #32FF47
    let orangeish = #colorLiteral(red: 1, green: 0.6980392157, blue: 0.2980392157, alpha: 1) // #ffb24c
    let yellowishy = #colorLiteral(red: 0.9882352941, green: 1, blue: 0.2980392157, alpha: 1) // #fcff4c
    let commentGrey = #colorLiteral(red: 0.7008966023, green: 0.7301803691, blue: 0.8538076556, alpha: 1) // #9BCCE3
    
    let gutterStyle: GutterStyle = GutterStyle(
        backgroundColor: Color(red: 22/255.0, green: 22/255, blue: 22/255, alpha: 1.0),
        separatorColor: Color(red: 15/255.0, green: 15/255, blue: 15/255, alpha: 1.0),
        minimumWidth: 40)
    
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
            return [.foregroundColor: commentGrey]
        case .string:
            return [.foregroundColor: redey]
        case .attribute:
            return [.foregroundColor: greenish]
        case .number:
            return [.foregroundColor: orangeish]
        case .extra:
            return [.foregroundColor: bluish]
        case .keyword:
            return [.foregroundColor: cyanish]
        }
    }
    
}
