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
    
    // This is not really an exhaustive list, it's more of a rough estimation of
    // what you can encounter in a lot/most of languages. Add more to it!
    // BTW is attribute the correct name? Token was taken.
    var commonAttributes = ["var", "val", "let", "if", "else", "export", "import", "return", "static", "fun", "function", "func", "class", "open"]
    
    func generators(source: String) -> [TokenGenerator] {
        
        var generators = [TokenGenerator?]()
        
        generators.append(regexToken(.comment, "//(.*)"))
        
        generators.append(regexToken(.comment, "(/\\*)(.*)(\\*/)", options: [.dotMatchesLineSeparators, .caseInsensitive]))
        
        generators.append(regexToken(.string, "(\"|@\")[^\"\\n]*(@\"|\")", options: [.dotMatchesLineSeparators, .caseInsensitive]))
        generators.append(regexToken(.string, "(\"\"\")(.*?)(\"\"\")", options: [.dotMatchesLineSeparators, .caseInsensitive]))
        
        
        // Find common attributes
        
        generators.append(regexToken(.attribute, "(?:[\\s]|^)(\(commonAttributes.joined(separator: "|")))(?=[\\s]|$)", options: .dotMatchesLineSeparators))
        
        
        
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
    
    func regexToken(_ type: BoopToken.TokenType, _ pattern:String, options: NSRegularExpression.Options = .caseInsensitive) -> TokenGenerator? {
        guard let regex = try? NSRegularExpression(pattern: pattern, options: options) else {
            return nil
        }
        let generator = RegexTokenGenerator(regularExpression: regex, tokenTransformer: { (range) -> Token in
            return BoopToken(type: type, range: range)
        })
        return TokenGenerator.regex(generator)
    }
    
}
