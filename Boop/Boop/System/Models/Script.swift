//
//  Script.swift
//  Boop
//
//  Created by Ivan on 2/13/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Foundation
import JavaScriptCore

class Script: NSObject {
    
    var scriptCode:String
    
    var context:JSContext
    lazy var main:JSValue = {
        return context.objectForKeyedSubscript("main")
    }()
    
    var info:[String: Any]
    
    @objc dynamic var name: String?
    @objc dynamic var tags: String?
    @objc dynamic var desc: String?
    @objc dynamic var icon: String?
    
    init(script:String, parameters: [String: Any]) {
        
        
        scriptCode = script
        info = parameters
        
        self.name = parameters["name"] as? String
        self.tags = parameters["tags"] as? String
        self.desc = parameters["description"] as? String
        self.icon = parameters["icon"] as? String
        
        context = JSContext()
        
        super.init();
        
        context.exceptionHandler = { context, exception in
            print("[\(self.name ?? "Unknown Script")] Error: \(exception?.toString() ?? "Unknown Error") ")
        }

        
        context.setObject(ScriptExecution.self, forKeyedSubscript: "ScriptExecution" as NSString)
        
        context.evaluateScript(script)
        
    }
    
    
    func run(with execution: ScriptExecution) {
        main.call(withArguments: [execution])
    }
    
}

extension Script: Fuseable {
    
    var properties: [FuseProperty] {
        return [
            FuseProperty(name: "name", weight: 0.9),
            FuseProperty(name: "tags", weight: 0.6),
            FuseProperty(name: "desc", weight: 0.2)
        ]
    }
}
