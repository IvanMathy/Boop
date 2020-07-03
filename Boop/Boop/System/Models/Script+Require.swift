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
            
            var path = path
            
            if !path.hasSuffix(".js") {
                path += ".js"
            }
            
            return nil
        }
        
        self.context.setObject(require, forKeyedSubscript: "require" as NSString)

    }
}
