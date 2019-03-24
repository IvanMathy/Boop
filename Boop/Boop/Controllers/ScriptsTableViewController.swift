//
//  ScriptsTableViewController.swift
//  Boop
//
//  Created by Ivan on 2/13/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa

class ScriptsTableViewController: NSViewController, NSTableViewDelegate, NSTableViewDataSource {
    
    @IBOutlet weak var tableView: ScriptTableView!
    
    var results: [Script] = [] {
        didSet {
            tableView.reloadData()
        }
    }
    
    func numberOfRows(in tableView: NSTableView) -> Int {
        return results.count
    }
    
    func tableView(_ tableView: NSTableView, viewFor tableColumn: NSTableColumn?, row: Int) -> NSView? {        
        
        let view = tableView.makeView(withIdentifier: NSUserInterfaceItemIdentifier(rawValue: "scriptCell"), owner: self) as! ScriptTableViewCell
        
        let script = scriptAt(row)
        
        view.titleLabel.stringValue = script.name ?? "No Name 🤔"
        view.subtitleLabel.stringValue = script.desc ?? "No Description 😢"
        
        view.imageView?.image = NSImage(named: "icons8-\(script.icon ?? "unknown")")
        
        return view
        
    }
    
    func scriptAt(_ index: Int) -> Script {
        return results[index]
    }
}
