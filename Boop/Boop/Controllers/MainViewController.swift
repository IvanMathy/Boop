//
//  MainViewController.swift
//  Boop
//
//  Created by Ivan on 1/26/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa
import SavannaKit

class MainViewController: NSViewController {

    @IBOutlet weak var editorView: SyntaxTextView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        editorView.delegate = self
        editorView.theme = DefaultTheme()
        editorView.allowsAutocomplete = false
    
    }
    
}

extension MainViewController: SyntaxTextViewDelegate {
    func didChangeFont(_ font: Font) {
        //
    }
    
    func lexerForSource(_ source: String) -> Lexer {
        return BoopLexer()
    }
    
    
}
