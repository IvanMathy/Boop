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
}


@objc class ScriptExecution: NSObject, ScriptExecutionJSExport {
    var selection: String? {
        get {
            return nil
        }
        set {
            
        }
    }
    var fullText: String? {
        get {
            return nil
        }
        set{
            
        }
    }
    
    var text: String? {
        get {
            return nil
        }
        set{
            
        }
    }
    
}
