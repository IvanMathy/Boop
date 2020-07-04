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
            
            
            let rawCode = try! String(contentsOfFile: url!.path)
            
          

            // This is not ideal, I tried using native JSC bindings
            // but no luck getting it to play nice. TODO I guess?
            
           let wrappedCode =
"""
            
(function() {
    var module = {
        exports: {}
    };
            
    const moduleWrapper = (function (exports, module) {
        \(rawCode)
    }).apply(module.exports, [module.exports, module]);

    return module.exports;
})();
            
"""
            
            return self.context.evaluateScript(wrappedCode, withSourceURL: url)
        }
        
        self.context.setObject(require, forKeyedSubscript: "require" as NSString)

    }
}
