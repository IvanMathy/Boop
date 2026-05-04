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

    @IBAction func didClickBrowseButton(_ sender: Any) {
        let panel = NSOpenPanel()
        
        panel.canChooseFiles = false
        panel.canChooseDirectories = true
        panel.allowsMultipleSelection = false
        
        panel.begin { result in
            do {
                
                guard let url = panel.url, result == NSApplication.ModalResponse.OK else {
                        return
                }
                
                UserDefaults.standard.set(url, forKey: ScriptManager.userPreferencesPathKey)
                
                try ScriptManager.setBookmarkData(url: url)
                
            } catch let error {
                print(error)
            }
            
        }
        
    }
    
    // Currently disabled since this is not Sandbox friendly...
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

        guard let url = URL(string: "https://boop.okat.best/docs/scripts") else {
            assertionFailure("Could not generate help URL.")
            return
        }
        NSWorkspace.shared.open(url)
    }
}
