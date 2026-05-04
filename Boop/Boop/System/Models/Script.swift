//
//  Script.swift
//  Boop
//
//  Created by Ivan on 2/13/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Foundation
import JavaScriptCore
import Fuse

class Script: NSObject {
    
    var isBuiltInt: Bool
    var url: URL
    var scriptCode: String
    
    
    lazy var context: JSContext = { [unowned self] in
        let context: JSContext = JSContext()
        context.name = self.name ?? "Unknown Script"
        
        context.exceptionHandler = { [unowned self] context, exception in
            let message = "[\(self.name ?? "Unknown Script")] Error: \(exception?.toString() ?? "Unknown Error") "
            print(message)
            self.onScriptError(message: message)
        }

        self.setupRequire(context: context)
        
        context.setObject(ScriptExecution.self, forKeyedSubscript: "ScriptExecution" as NSString)
        
        context.evaluateScript(self.scriptCode, withSourceURL: url)
        
        return context
    }()
    
    lazy var main: JSValue = {
        return context.objectForKeyedSubscript("main")
    }()
    
    var info:[String: Any]
    
    var name: String?
    var tags: String?
    var desc: String?
    var icon: String?
    var bias: Double?
    
    weak var delegate: ScriptDelegate?
    
    init(url: URL, script:String, parameters: [String: Any], builtIn: Bool, delegate: ScriptDelegate? = nil) {
        
        
        self.scriptCode = script
        self.info = parameters
        self.url = url
        self.isBuiltInt = builtIn
        
        self.name = parameters["name"] as? String
        self.tags = parameters["tags"] as? String
        self.desc = parameters["description"] as? String
        self.icon = (parameters["icon"] as? String)?.lowercased()
        self.bias = parameters["bias"] as? Double
        
        
        
        // We set the delegate after the initial eval to avoid
        // showing init errors from scripts at launch.
        self.delegate = delegate
        
    }
    
    func onScriptError(message: String) {
        self.delegate?.onScriptError(message: message)
    }
    
    func onScriptInfo(message: String) {
        self.delegate?.onScriptInfo(message: message)
    }
    
    func run(with execution: ScriptExecution) {
        main.call(withArguments: [execution])
    }
    
}

extension Script: Fuseable {
    
    var properties: [FuseProperty] {
        return [
            FuseProperty(value: name, weight: 0.9),
            FuseProperty(value: tags, weight: 0.6),
            FuseProperty(value: desc, weight: 0.2)
        ]
    }
}

protocol ScriptDelegate: class {
    func onScriptError(message: String)
    func onScriptInfo(message: String)
}
