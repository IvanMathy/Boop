//
//  ScriptsTableViewController.swift
//  Boop
//
//  Created by Ivan on 2/13/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa

class ScriptsTableViewController: NSViewController, NSTableViewDelegate, NSTableViewDataSource {
    
    
    @IBOutlet weak var scriptManager: ScriptManager!
    
    func numberOfRows(in tableView: NSTableView) -> Int {
        return scriptManager.scripts.count
    }
    
    func tableView(_ tableView: NSTableView, viewFor tableColumn: NSTableColumn?, row: Int) -> NSView? {        
        
        let view = tableView.makeView(withIdentifier: NSUserInterfaceItemIdentifier(rawValue: "scriptCell"), owner: self) as! ScriptTableViewCell
        
        view.titleLabel.stringValue = scriptManager.scripts[row].info["name"] as! String
        view.subtitleLabel.stringValue = scriptManager.scripts[row].info["description"] as! String
        
        //view.imageView?.image = NSImage(named:  scriptManager.scripts[row].info["icon"] as! String + "Icon")
        
        return view
        
    }
}
