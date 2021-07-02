/**
    {
        "api":1,
        "name":"AscII-Art",
        "description":"Converts Text to ASCII.",
        "author":"Marvin Nahmias: blockgenerator and font by Drew Thoennes.",
        "icon":"html",
        "tags":"ascii,asciiart,text2ascii"
    }
**/

const assert = require('assert');
const blockLetterGenerator = require('./asciiart-draw.js');

function main(state) {
    var all = state.selection 

    state.text = blockLetterGenerator(all, {lineBreak: '#'})
}
