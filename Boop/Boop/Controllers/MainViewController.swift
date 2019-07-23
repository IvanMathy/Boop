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
        
        editorView.contentTextView.selectedTextAttributes = [.backgroundColor:NSColor(red:0.19, green:0.44, blue:0.71, alpha:1.0), .foregroundColor: NSColor.white]
        
        let fieldEditor = self.view.window?.fieldEditor(true, for: editorView.contentTextView)!
        
        fieldEditor?.menu
    
    }
    
}

extension MainViewController: SyntaxTextViewDelegate {
    func didChangeText(_ syntaxTextView: SyntaxTextView) {
        
    }
    
    func didChangeSelectedRange(_ syntaxTextView: SyntaxTextView, selectedRange: NSRange) {
        
    }
    
    func didChangeFont(_ font: Font) {
        //
    }
    
    func lexerForSource(_ source: String) -> Lexer {
        return BoopLexer()
    }
    
    
}
