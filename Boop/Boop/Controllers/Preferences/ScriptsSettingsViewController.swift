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
    
    static func setBookmarkData(url: URL) throws {
        
        let data = try url.bookmarkData(options: NSURL.BookmarkCreationOptions.withSecurityScope, includingResourceValuesForKeys: nil, relativeTo: nil)
        
        UserDefaults.standard.set(data, forKey: ScriptManager.userPreferencesDataKey)
    }

    @IBAction func didClickBrowseButton(_ sender: Any) {
        let panel = NSOpenPanel()
        
        panel.canChooseFiles = false
        panel.canChooseDirectories = true
        panel.allowsMultipleSelection = false
        
//        guard panel.runModal() == .OK, let url = panel.directoryURL else {
//            return
//        }
        
        
        panel.begin
           {
            result in
            if result.rawValue == NSFileHandlingPanelOKButton {
                do {
                    guard let url = panel.url else {
                            return
                    }
                    
                    UserDefaults.standard.set(url, forKey: ScriptManager.userPreferencesPathKey)
                    
                    try ScriptsSettingsViewController.setBookmarkData(url: url)
                    
                    
                } catch let error {
                    print(error)
                }
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

        guard let url = URL(string: "https://github.com/IvanMathy/Boop/blob/master/Boop/Documentation/CustomScripts.md") else {
            assertionFailure("Could not generate help URL.")
            return
        }
        NSWorkspace.shared.open(url)
    }
}
