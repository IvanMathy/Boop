//
//  Script+Require.swift
//  Boop
//
//  Created by Ivan on 6/29/20.
//  Copyright © 2020 OKatBest. All rights reserved.
//

import Foundation
import JavaScriptCore

extension Script {
    func setupRequire() {
        let require: @convention(block) (String) -> (JSValue?) = {
            path in
            
            let savedExports = self.context.objectForKeyedSubscript("exports")

            
            var path = path
            
            if !path.hasSuffix(".js") {
                path += ".js"
            }
            
            var url = Bundle.main.url(forResource: "base64", withExtension: ".js", subdirectory: "scripts/lib")
            
         
            
            let tempContext = self.context.jsGlobalContextRef
            
            let rawCode = try! String(contentsOfFile: url!.path)
            
            
            let code = JSStringCreateWithCFString(rawCode as CFString)
            
            
            let exports = JSObjectMake(tempContext, nil, nil)
            let exportsName = JSStringCreateWithCFString("exports" as CFString)
            let globalObject = JSContextGetGlobalObject(tempContext)
            
            JSObjectSetProperty(tempContext, globalObject, exportsName, exports, JSPropertyAttributes(kJSPropertyAttributeNone), nil)
            
            JSStringRelease(exportsName)
            

            var exception : JSValueRef? = nil
            
            /*
                      
                    func JSEvaluateScript(_ ctx: JSContextRef!,
                      _ script: JSStringRef!,
                      _ thisObject: JSObjectRef!,
                      _ sourceURL: JSStringRef!,
                      _ startingLineNumber: Int32,
                      _ exception: UnsafeMutablePointer<JSValueRef?>!) -> JSValueRef!

                      
                      */
            
            let value = JSEvaluateScript(tempContext, code, exports, nil, 0, &exception)
                
            JSStringRelease(code)
            
            let json = JSValueCreateJSONString(tempContext, exports, 1, nil)
            

            let maxBufferSize = JSStringGetMaximumUTF8CStringSize(json)
            let buffer = UnsafeMutablePointer<Int8>.allocate(capacity: maxBufferSize)
            JSStringGetUTF8CString(json, buffer, maxBufferSize)
            
            let jsValue = self.context.objectForKeyedSubscript("exports")

            self.context.setObject(savedExports, forKeyedSubscript: "exports" as NSString)
            
            return jsValue
        }
        
        self.context.setObject(require, forKeyedSubscript: "require" as NSString)

    }
}
