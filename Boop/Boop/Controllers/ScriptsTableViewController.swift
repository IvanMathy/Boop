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
        
        guard let script = scriptAt(row) else {
            fatalError("Missing script for index \(row).")
        }
        
        view.titleLabel.stringValue = script.name ?? "No Name 🤔"
        view.subtitleLabel.stringValue = script.desc ?? "No Description 😢"
        
        view.imageView?.image = NSImage(named: "icons8-\(script.icon ?? "unknown")")
        
        return view
        
    }
    
    func scriptAt(_ index: Int) -> Script? {
        guard index < results.count else {
            return nil
        }
        return results[index]
    }
    
    var selectedScript:Script? {
        guard tableView.selectedRow >= 0 else {
            // Nothing selected, return first item
            return scriptAt(0)
        }
        return scriptAt(tableView.selectedRow)
    }
}
