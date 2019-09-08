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
    var commonAttributes = ["var", "val", "let", "if", "else", "export", "import", "return", "static", "fun", "function", "func", "class", "open", "new"]
    
    func generators(source: String) -> [TokenGenerator] {
        
        let standalonePrefix = "(?:[\\s]|^)"
        let standaloneSuffix = "(?=[\\s]|$)"
        
        var generators = [TokenGenerator?]()
        
        let number = "\\b(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)\\b"
        
        generators.append(regexToken(.number, number))
        
        // Find common attributes
        
        generators.append(regexToken(.attribute, "\(standalonePrefix)(\(commonAttributes.joined(separator: "|")))\(standaloneSuffix)", options: .dotMatchesLineSeparators))
        
        
        // Extras
        
        generators.append(regexToken(.extra, "\(standalonePrefix)([a-f0-9]{32})\(standaloneSuffix)", options: .dotMatchesLineSeparators))
        
        
        // Strings
        
        generators.append(regexToken(.string, "(\"|@\")(?:[^\"\\\\]|\\\\.)*[^\"\\n]*(@\"|\")", options: [.dotMatchesLineSeparators, .caseInsensitive]))
        generators.append(regexToken(.string, "(\"\"\")(.*?)(\"\"\")", options: [.dotMatchesLineSeparators, .caseInsensitive]))
        
        // Comments
        
        let quoteLookahead = "(?=(?:(?:[^\"]*\"){2})*[^\"]*$)"
        
        generators.append(regexToken(.comment, "\(quoteLookahead)//(.*)"))
        
        generators.append(regexToken(.comment, "\(quoteLookahead)/\\*.*?\\*/", options: [.dotMatchesLineSeparators, .caseInsensitive]))
        
        generators.append(regexToken(.comment, "\(quoteLookahead)<\\!--[\\s\\S]*?(?:-\\->|$)", options: [.dotMatchesLineSeparators, .caseInsensitive]))
        
        
        
        
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
