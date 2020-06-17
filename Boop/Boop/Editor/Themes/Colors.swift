//
//  Colors.swift
//  Boop
//
//  Created by Ivan on 9/29/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa

struct Colors {
    
    static let redey: NSColor = #colorLiteral(red: 1, green: 0.2980392157, blue: 0.4862745098, alpha: 1) // #ff4c7c
    static let bluish: NSColor = #colorLiteral(red: 0.5, green: 0.8870540044, blue: 1, alpha: 1) // #3586FF
    static let cyanish: NSColor = #colorLiteral(red: 0.1595847315, green: 0.951053901, blue: 0.7986315017, alpha: 1) // #4cffb2
    static let greenish: NSColor = #colorLiteral(red: 0.6049238592, green: 1, blue: 0, alpha: 1) // #32FF47
    static let orangeish: NSColor = #colorLiteral(red: 1, green: 0.6980392157, blue: 0.2980392157, alpha: 1) // #ffb24c
    static let yellowishy: NSColor = #colorLiteral(red: 0.9882352941, green: 1, blue: 0.2980392157, alpha: 1) // #fcff4c
    static let commentGrey: NSColor = #colorLiteral(red: 0.7008966023, green: 0.7301803691, blue: 0.8538076556, alpha: 1) // #9BCCE3
    static let redButDarker: NSColor = #colorLiteral(red: 0.7254901961, green: 0.09411764706, blue: 0.262745098, alpha: 1) // #B91843
    static let blueButDarker: NSColor = #colorLiteral(red: 0, green: 0.4156862745, blue: 0.7176470588, alpha: 1) // #006AB7
    static let greenButDarker: NSColor = #colorLiteral(red: 0, green: 0.6980392157, blue: 0, alpha: 1) // #00B200
    static let purpleButDarker: NSColor = #colorLiteral(red: 0.462745098, green: 0, blue: 0.462745098, alpha: 1) // #760076
    
    static func dynamicColor(light: NSColor, dark: NSColor, for appearance: NSAppearance) -> NSColor {
        if appearance.bestMatch(from: [.darkAqua, .aqua]) == .darkAqua {
           return dark
        } else {
           return light
        }
    }
}

struct ColorPair {
    
    static let red = ColorPair(light: Colors.redButDarker, dark: Colors.redey)
    static let blue = ColorPair(light: Colors.blueButDarker, dark: Colors.bluish)
    static let green = ColorPair(light: Colors.greenButDarker, dark: Colors.greenish)
    static let purple = ColorPair(light: Colors.purpleButDarker, dark: Colors.purpleButDarker)
    
    static let body = ColorPair(light: .black, dark: .white)
    static let normal = ColorPair(light: .white, dark: .init(white: 0.1, alpha: 1))
    static let popover = ColorPair(light: .white, dark: .init(white: 0.05, alpha: 1))
    static let background = ColorPair(light: .init(white: 0.95, alpha: 1), dark: NSColor(red: 31/255.0, green: 31/255, blue: 31/255, alpha: 1.0))
    
    let light: NSColor
    let dark: NSColor
    
    func value(for appearance: NSAppearance) -> NSColor {
        return Colors.dynamicColor(light: self.light, dark: self.dark, for: appearance)
    }

    var swap: ColorPair {
        return ColorPair(light: self.dark, dark: self.light)
    }
}


