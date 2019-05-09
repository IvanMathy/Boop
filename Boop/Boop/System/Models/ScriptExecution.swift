//
//  ScriptExecution.swift
//  Boop
//
//  Created by Ivan on 4/21/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Foundation
import JavaScriptCore

@objc protocol ScriptExecutionJSExport: JSExport {
    var selection: String? { get set }
    var fullText: String? { get set }
    var text: String? { get set }
    var isSelection: Bool { get }
}


@objc class ScriptExecution: NSObject, ScriptExecutionJSExport {
    
    var isSelection: Bool
    var selection: String?
    var fullText: String?
    
    init(selection: String?, fullText: String) {
        self.isSelection = (selection != nil)
        self.selection = selection
        self.fullText = fullText
    }
    
    var text: String? {
        get {
            return isSelection ? selection : fullText
        }
        set{
            if isSelection {
                selection = newValue
            } else {
                fullText = newValue
            }
        }
    }
    
    
}
