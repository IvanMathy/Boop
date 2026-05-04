//
//  BoopToken.swift
//  Boop
//
//  Created by Ivan on 1/27/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa
import SavannaKit

class BoopToken: Token, CustomStringConvertible {
    
    
    
    public enum TokenType: String {
        case comment
        case string
        case attribute
        case keyword
        case number
        case extra
    }
    
    // There is no support for placeholder yet or planned.
    var isEditorPlaceholder = false
    
    // Plain tokens are not even parsed in the first place.
    var isPlain = false
    
    var isActive = true
    var isGreedy: Bool
    
    var range: NSRange
    var type: BoopToken.TokenType
    
    init(type:TokenType, range: NSRange, greedy: Bool = false) {
        self.range = range
        self.type = type
        self.isGreedy = greedy
    }
    

    var description: String {
        return type.rawValue
    }
    
    
}
