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
    
    init(script:String, parameters: [String: Any]) {
        
        scriptCode = script
        
        info = parameters
        
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

