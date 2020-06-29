//
//  ThemeSettingsViewController.swift
//  Boop
//
//  Created by Ivan on 6/18/20.
//  Copyright © 2020 OKatBest. All rights reserved.
//

import Foundation
import Cocoa

enum BoopColorScheme: Int {
    case system
    case light
    case dark
}

class ThemeSettingsViewController: NSViewController {
    static let userPreferencesSchemeKey = "boopColorScheme"
    
    static func applyTheme() {
        switch BoopColorScheme(rawValue: UserDefaults.standard.integer(forKey: "boopColorScheme")) {
        case .dark:
            NSApp.appearance = NSAppearance(named: .darkAqua)
        case .light:
            NSApp.appearance = NSAppearance(named: .aqua)
        default:
            NSApp.appearance = nil
        }
    }
    
    override func viewWillAppear() {
        super.viewWillAppear()
        preferredContentSize = view.fittingSize
    }
    @IBAction func didChangeColorTheme(_ sender: Any) {
        ThemeSettingsViewController.applyTheme()
    }
}
