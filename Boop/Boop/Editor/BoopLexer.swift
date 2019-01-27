//
//  BoopLexer.swift
//  Boop
//
//  Created by Ivan on 1/26/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa
import SavannaKit

class BoopLexer: RegexLexer {
    func generators(source: String) -> [TokenGenerator] {
        
        var generators = [TokenGenerator?]()
        
        generators.append(regexToken("//(.*)"))
        
        /*// Line comment
        generators.append(RegexTokenGenerator(regularExpression: regex("//(.*)"), tokenTransformer: .comment))
        
        // Block comment
        generators.append(RegexTokenGenerator("(/\\*)(.*)(\\*---/)", options: [.dotMatchesLineSeparators], tokenTransformer: .comment))
        
        // Single-line string literal
        generators.append(RegexTokenGenerator("(\"|@\")[^\"\\n]*(@\"|\")", tokenTransformer: .string))
        
        // Multi-line string literal
        generators.append(RegexTokenGenerator("(\"\"\")(.*?)(\"\"\")", options: [.dotMatchesLineSeparators], tokenTransformer: .string))
        
        
        */
        
        return generators.compactMap( { $0 })
    }
    
    func regexToken(_ pattern:String) -> TokenGenerator? {
        guard let regex = try? NSRegularExpression(pattern: pattern, options: .caseInsensitive) else {
            return nil
        }
        let generator = RegexTokenGenerator(regularExpression: regex, tokenTransformer: { (range) -> Token in
            return BoopToken(type: .comment, range: range)
        })
        return TokenGenerator.regex(generator)
    }
    
}
