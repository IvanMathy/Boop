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
    @IBOutlet weak var updateBuddy: UpdateBuddy!
    @IBOutlet weak var checkUpdateMenuItem: NSMenuItem!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        #if APPSTORE
        
        checkUpdateMenuItem.isHidden = true
        
        #endif
        
        editorView.delegate = self
        
        editorView.contentTextView.selectedTextAttributes = [.backgroundColor:NSColor(red:0.19, green:0.44, blue:0.71, alpha:1.0), .foregroundColor: NSColor.white]
        
    }
    @IBAction func openHelp(_ sender: Any) {
        open(url: "https://boop.okat.best/docs/")
    }
    
    
    @IBAction func openScripts(_ sender: Any) {
        open(url: "https://boop.okat.best/scripts/")
    }
    
    
    func open(url: String) {
        guard let url = URL(string: url) else {
            assertionFailure("Could not generate help URL.")
            return
        }
        NSWorkspace.shared.open(url)
    }
    
    @IBAction func clear(_ sender: Any) {
        setText("")
    }
    
    public func setText(_ text: String) {
        let textView = editorView.contentTextView
        textView.textStorage?.beginEditing()
        
        let range = NSRange(location: 0, length: textView.textStorage?.length ?? textView.string.count)
        
        guard textView.shouldChangeText(in: range, replacementString: text) else {
            return
        }
        
        textView.textStorage?.replaceCharacters(in: range, with: text)
        
        textView.textStorage?.endEditing()
        textView.didChangeText()
    }
    

    @IBAction func checkForUpdates(_ sender: Any) {
        updateBuddy.check()
    }

    @IBAction func openFile(sender: AnyObject) {
        
        let dialog = NSOpenPanel();
        
        dialog.title                   = "Choose a file";
        dialog.showsResizeIndicator    = true;
        dialog.showsHiddenFiles        = false;
        dialog.canChooseDirectories    = false;
        dialog.canCreateDirectories    = false;
        dialog.allowsMultipleSelection = false;

        if (dialog.runModal() == NSApplication.ModalResponse.OK) {
            if let pathUrl = dialog.url { // Pathname of the file
                let text=try? String(contentsOf: pathUrl)
                setText(text ?? "Failed to load file '\(pathUrl.path)'.")
            }
        }
        
    }
    
    @IBAction func saveFileAs(sender: AnyObject) {
        
        let dialog = NSSavePanel();
        
        dialog.title                   = "Save content as…";
        dialog.showsResizeIndicator    = true;
        dialog.showsHiddenFiles        = false;
        dialog.showsTagField           = false;
        dialog.canCreateDirectories    = true;
        dialog.nameFieldStringValue    = "Untitled.txt"

        if (dialog.runModal() == NSApplication.ModalResponse.OK) {
            if let pathUrl = dialog.url { // Pathname of the file
                let textView = editorView.contentTextView
                let textData=textView.textStorage?.string.data(using: .utf8)
                do {
                    try textData?.write(to: pathUrl)
                } catch let error as NSError {
                    setText("Failed to save content to file '\(pathUrl.path)'. (Reason: \(error.localizedFailureReason!))")
                    // TODO: Show error in alert box
                }
            }
        }
        
    }
    
}

extension MainViewController: SyntaxTextViewDelegate {
    func theme(for appearance: NSAppearance) -> SyntaxColorTheme {
        return DefaultTheme(appearance: appearance)
    }
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
