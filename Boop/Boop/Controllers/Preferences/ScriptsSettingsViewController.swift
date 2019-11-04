//
//  ScriptsSettingsViewController.swift
//  Boop
//
//  Created by Ivan on 11/3/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa
import Foundation

class ScriptsSettingsViewController: NSViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do view setup here.
    }
    @IBAction func didClickBrowseButton(_ sender: Any) {
        let panel = NSOpenPanel()
        
        // panel.directoryURL
        
        panel.canChooseFiles = false
        panel.canChooseDirectories = true
        panel.allowsMultipleSelection = false
        
        guard panel.runModal() == .OK, let url = panel.directoryURL else {
            return
        }
        
        UserDefaults.standard.set(url, forKey: "scriptsFolderPath")
        
    }
    
    @IBAction func didClickDefaultLocation(_ sender: Any) {
        let alert = NSAlert()
        alert.messageText = "The default Boop folder does not exist. Would you like to create it?"
        alert.informativeText = "The folder will be created at ~/Documents/Boop."
        alert.addButton(withTitle: "Create")
        alert.addButton(withTitle: "Cancel")
        
        guard alert.runModal() == .alertSecondButtonReturn else {
            return
        }
        
        
    }
    
    @IBAction func didClickHelpButton(_ sender: Any) {

        guard let url = URL(string: "https://github.com/IvanMathy/Boop/blob/master/Boop/Documentation/CustomScripts.md") else {
            assertionFailure("Could not generate help URL.")
            return
        }
        NSWorkspace.shared.open(url)
    }
}
