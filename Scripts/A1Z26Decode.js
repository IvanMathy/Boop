/**
  {
    "api":1,
    "name":"A1Z26 (Decode)",
    "description":"Decodes A1Z26",
    "author":"G_cat",
    "icon":"translation",
    "tags":"a1z26,code,cypher,decode"
  }
**/

function main(state) {
    // object of decodings 
    const rule = {
        '1': "A",
        "2": "B",
        "3": "C",
        "4": "D",
        "5": "E",
        "6": "F",
        "7": "G",
        "8": "H",
        "9": "I",
        "10": "J",
        "11": "K",
        "12": "L",
        "13": "M",
        "14": "N",
        "15": "O",
        "16": "P",
        "17": "Q",
        "18": "R",
        "19": "S",
        "20": "T",
        "21": "U",
        "22": "V",
        "23": "W",
        "24": "X",
        "25": "Y",
        "26": "Z"
    };

    let decode = "" // decode string
    state.text.split(" ").forEach(str => { // for each encode 
      str.split("-").forEach(i => { // for each A1Z26 letter
        if(rule[i] != undefined) { decode += rule[i]; } // decode
        else { decode += i } // if not in rule put i
      });
      decode += ' '; // add a space
    });

    state.text = decode; // replace text
}