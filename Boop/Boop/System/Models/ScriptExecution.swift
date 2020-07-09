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
    func postError(_ error: String)
    func postInfo(_ info: String)
    func insert(_ newValue: String)
}


@objc class ScriptExecution: NSObject, ScriptExecutionJSExport {
    
    var isSelection: Bool
    var selection: String?
    var fullText: String?
    let insertIndex: Int?
    
    private weak var script: Script?
    
    init(selection: String?, fullText: String, script: Script, insertIndex: Int?) {
        self.isSelection = (selection != nil)
        self.selection = selection
        self.fullText = fullText
        self.script = script
        self.insertIndex = insertIndex
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
    
    
    func postError(_ error: String) {
        self.script?.onScriptError(message: error)
    }
    func postInfo(_ info: String) {
        self.script?.onScriptInfo(message: info)
    }
    
    func insert(_ newValue: String) {
        if isSelection {
            selection = newValue
        } else {
            if let insertIndex = self.insertIndex, fullText != nil {
                let point = fullText!.index(fullText!.startIndex, offsetBy: insertIndex)
                fullText!.insert(contentsOf: newValue, at: point )
            }
        }
    }
}
