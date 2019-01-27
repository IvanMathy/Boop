//
//  BoopToken.swift
//  Boop
//
//  Created by Ivan on 1/27/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa
import SavannaKit

class BoopToken: Token {
    
    enum TokenType {
        case comment
    }
    
    // There is no support for placeholder yet or planned.
    var isEditorPlaceholder = false
    
    // Plain tokens are not even parsed in the first place.
    var isPlain = false
    
    var range: Range<String.Index>
    var type: TokenType
    
    init(type:TokenType, range: Range<String.Index>) {
        self.range = range
        self.type = type
    }
    

    
    
}
