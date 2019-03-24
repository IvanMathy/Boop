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
    var main:JSValue
    
    var info:[String: Any]
    
    @objc dynamic var name: String?
    @objc dynamic var tags: String?
    @objc dynamic var desc: String?
    
    init(script:String, parameters: [String: Any]) {
        
        scriptCode = script
        info = parameters
        
        self.name = parameters["name"] as? String
        self.tags = parameters["tags"] as? String
        self.desc = parameters["description"] as? String
        
        context = JSContext()
        context.evaluateScript(script)
        
        main = context.objectForKeyedSubscript("main")
        
        super.init();
    }
    
    
    func evalWith(value:String){
        
        let result = main.call(withArguments: [value])
        
        print(result?.toDictionary());
        
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
