//
//  ScriptManager.swift
//  Yup
//
//  Created by Ivan on 1/15/17.
//  Copyright © 2017 OKatBest. All rights reserved.
//

import Cocoa

class ScriptManager: NSObject {
    
    var scripts = [Script]()
    
    let currentAPIVersion = 1.0
    
    override init() {
        super.init()
        
        loadDefaultScripts()
        
    }
    
    func loadDefaultScripts(){
        let scripts = Bundle.main.paths(forResourcesOfType: "js", inDirectory: "scripts")
        
        let _ = scripts.map { (script:String) in
            loadScript(path: script)
        }
        
    }
    
    func loadScript(path:String){
        do{
            let script = try String(contentsOfFile: path)
            
            // This is inspired by the ISF file format by Vidvox
            // Thanks to them for the idea and their awesome work
            
            let openComment = script.range(of: "/*")
            let closeComment = script.range(of: "*/")
            
            
            if((openComment != nil) && (closeComment != nil)){
                let meta = script[openComment!.upperBound..<closeComment!.lowerBound]
                
                let json = try JSONSerialization.jsonObject(with: meta.data(using: .utf8)!, options: .allowFragments) as! [String: Any]
                
                let scriptObject = Script.init(script: script, parameters: json)
                
                scripts.append(scriptObject)
                
            }
            
        } catch {
            print("Unable to load ",path)
        }
    }

}
