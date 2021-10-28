/**
  {
    "api":1,
    "name":"Morse code (Decode)",
    "description":"Decodes morse code",
    "author":"G_cat",
    "icon":"translation",
    "tags":"morse,code,cypher,decode"
  }
**/

function main(state) {
    // object of decodings 
    const rule = {
        '.-': "A",
        "-...": "B",
        "-.-.": "C",
        "-..": "D",
        ".": "E",
        "..-.": "F",
        "--.": "G",
        "....": "H",
        "..": "I",
        ".---": "J",
        "-.-": "K",
        ".-..": "L",
        "--": "M",
        "-.": "N",
        "---": "O",
        ".--.": "P",
        "--.-": "Q",
        ".-.": "R",
        "...": "S",
        "-": "T",
        "..-": "U",
        "...-": "V",
        ".--": "W",
        "-..-": "X",
        "-.--": "Y",
        "--..": "Z",
        ".----": "1",
        "..---": "2",
        "...--": "3",
        "....-": "4",
        ".....": "5",
        "-....": "6",
        "--...": "7",
        "---..": "8",
        "----.": "9",
        "-----": "0"
    };

    let decode = "" // decode string
    state.text.replace(/—/gi, "-").replace(/•/gi, '.').split(" ").forEach(i => { // for each morse symbol
        if(rule[i] != undefined) { decode += rule[i]; } // decode
        else if(i=="") { decode += " " } // add a space if double space
        else { decode += i } // if not in rule put i
    });

    state.text = decode; // replace text
}