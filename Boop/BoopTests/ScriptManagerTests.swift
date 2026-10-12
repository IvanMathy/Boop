//
//  ScriptManagerTests.swift
//  BoopTests
//
//  Created by Ivan on 3/21/20.
//  Copyright © 2020 OKatBest. All rights reserved.
//

import XCTest

class ScriptManagerTests: XCTestCase {
    
    let manager = ScriptManager()


    func testManager() {
        XCTAssertFalse(manager.scripts.isEmpty)
    }

    func testDecimalToHexIntegers() throws {
        let script = try XCTUnwrap(manager.scripts.first { $0.name == "Decimal to Hex" })
        let cases = [
            ("120222480553230655", "1AB1DB58764413F"),
            ("120222480553230660", "1AB1DB587644144"),
            ("9007199254740993", "20000000000001"),
            ("18446744073709551615", "FFFFFFFFFFFFFFFF"),
            ("340282366920938463463374607431768211455", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"),
            ("-120222480553230655", "-1AB1DB58764413F"),
            ("+000255", "FF"),
            ("0", "0"),
            ("-000", "0"),
            ("255\n120222480553230655\n120222480553230660\nhello", "FF\n1AB1DB58764413F\n1AB1DB587644144\nhello"),
            (" 42 \n-255\n12.5\n1e3\n0xFF", "2A\n-FF\nC\n1\nFF")
        ]
        for (input, expected) in cases {
            let execution = ScriptExecution(selection: nil, fullText: input, script: script, insertIndex: nil)
            script.run(with: execution)
            XCTAssertEqual(execution.fullText, expected, "Input: \(input)")
            XCTAssertNil(script.context.exception)
        }
    }

    func testDecimalToHexSelection() throws {
        let script = try XCTUnwrap(manager.scripts.first { $0.name == "Decimal to Hex" })
        let execution = ScriptExecution(selection: "120222480553230655", fullText: "Keep this text", script: script, insertIndex: nil)
        script.run(with: execution)
        XCTAssertEqual(execution.selection, "1AB1DB58764413F")
        XCTAssertEqual(execution.fullText, "Keep this text")
        XCTAssertNil(script.context.exception)
    }

}
