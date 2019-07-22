//
//  ScriptManager.swift
//  Yup
//
//  Created by Ivan on 1/15/17.
//  Copyright © 2017 OKatBest. All rights reserved.
//

import Cocoa
import SavannaKit

class ScriptManager: NSObject {
    
    // This probably does not belong here.
    @IBOutlet weak var statusView: StatusView!
    
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
            
            let scriptObject = Script.init(script: script, parameters: json, delegate: self)
            
            scripts.append(scriptObject)
            
            
        } catch {
            print("Unable to load ",path)
        }
    }
    
    func search(_ query: String) -> [Script] {
        
        let results = fuse.search(query, in: scripts)
        
        return results.filter { result in
            result.score < 0.4 // Filter low quality results
        }.map { result in
            scripts[result.index]
        }
    }
    
    func runScript(_ script: Script, into editor: SyntaxTextView) {
        
        let textView = editor.contentTextView
        var fullText = editor.text
        
        guard let ranges = textView.selectedRanges as? [NSRange], ranges.reduce(0, { $0 + $1.length }) > 0 else {
            // No selection, run on full text
            let result = runScript(script, fullText: fullText)
            editor.text = result
            
            return
        }
        
        // Fun fact: You can have multi selections! Which means we need to disable
        // the ability to edit `fullText` while in selection mode, otherwise the
        // some scripts may accidentally run multiple time over the full text.
        
        let values = ranges.map {
            range -> String in
            
            let value = (fullText as NSString).substring(with: range)
            
            return runScript(script, selection: value, fullText: fullText)
            
        }
        
        
        // Since we have to replace each selection one by one, after each
        // occurence the whole text shifts around a bit, and therefore the
        // Ranges don't match their original position anymore. So we have
        // to offset everything based on the previous replacements deltas.
        // This is pretty straightforward because we know selections can't
        // overlap, and we sort them so they are always in order.
        
        var offset = 0
        let pairs = zip(ranges, values)
            .sorted{ $0.0.location < $1.0.location }
            .map {
                (pair) -> (NSRange, String) in
                
                let (range, value) = pair
                let length = range.length
                let newRange = NSRange(location: range.location + offset, length: length)
                
                offset += value.count - length
                return (newRange, value)
            }
        
        // 👆 I seriously don't know how to properly indent this.
        
        if (textView.shouldChangeText(inRanges: ranges as [NSValue], replacementStrings: values)) {
            
            pairs.forEach {
                (range, value) in
                textView.replaceCharacters(in: range, with: value)
            }
            
            textView.didChangeText()
        }
    }
    
    func runScript(_ script: Script, selection: String? = nil, fullText: String) -> String {
        let scriptExecution = ScriptExecution(selection: selection, fullText: fullText, script: script)
        
        script.run(with: scriptExecution)
        
        return scriptExecution.text ?? ""
    }

}

extension ScriptManager: ScriptDelegate {
    func onScriptError(message: String) {
        self.statusView.setStatus(.error(message))
    }
    
    func onScriptInfo(message: String) {
        self.statusView.setStatus(.info(message))
    }
    
    
}
