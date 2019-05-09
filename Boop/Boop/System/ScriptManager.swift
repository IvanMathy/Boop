//
//  ScriptManager.swift
//  Yup
//
//  Created by Ivan on 1/15/17.
//  Copyright © 2017 OKatBest. All rights reserved.
//

import Cocoa

class ScriptManager: NSObject {
    
    let fuse = Fuse(threshold: 0.2)
    var scripts = [Script]()
    
    let currentAPIVersion = 1.0
    
    override init() {
        super.init()
        
        loadDefaultScripts()
        
    }
    
    func loadDefaultScripts(){
        let files = Bundle.main.paths(forResourcesOfType: "js", inDirectory: "scripts")
        
        files.forEach { (script:String) in
            loadScript(path: script)
        }
    }
    
    func loadScript(path:String){
        do{
            let script = try String(contentsOfFile: path)
            
            // This is inspired by the ISF file format by Vidvox
            // Thanks to them for the idea and their awesome work
            
            
            guard
                let openComment = script.range(of: "/**"),
                let closeComment = script.range(of: "**/")
                else {
                    throw NSError()
            }
            
            let meta = script[openComment.upperBound..<closeComment.lowerBound]
            
            let json = try JSONSerialization.jsonObject(with: meta.data(using: .utf8)!, options: .allowFragments) as! [String: Any]
            
            let scriptObject = Script.init(script: script, parameters: json)
            
            scripts.append(scriptObject)
            
            
        } catch {
            print("Unable to load ",path)
        }
    }
    
    func search(_ query: String) -> [Script] {
        
        let results = fuse.search(query, in: scripts)
        
        results.forEach { item in
            print(scripts[item.index].name)
            print("index: \(item.index)")
            print("score: \(item.score)")
            print("results: \(item.results)")
            print("---------------")
        }
        
        return results.filter { result in
            result.score < 0.4 // Filter low quality results
        }.map { result in
            scripts[result.index]
        }
    }
    
    func runScript(_ script: Script) {
        let scriptExecution = ScriptExecution()
        
        script.run(with: scriptExecution)
        
    }

}
