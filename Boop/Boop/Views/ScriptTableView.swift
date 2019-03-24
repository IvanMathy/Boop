//
//  ScriptTableView.swift
//  Boop
//
//  Created by Ivan on 3/24/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Foundation
import Cocoa

class ScriptTableView: NSTableView {
    override func resignFirstResponder() -> Bool {
        self.deselectAll(self)
        return true
    }
}
