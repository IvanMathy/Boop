/**
 {
     "api": 1,
     "name": "Unindent",
     "description": "Unindent a block of text",
     "author": "Juri Pakaste",
     "icon": "arrow.left.to.line",
     "tags": "indentation,unindent"
 }
 **/

function unindent(text) {
    let lines = text.split('\n');
    let minIndent = null;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let indent = line.match(/^\s*/)[0];
        if (indent.length == line.length) {
            continue;
        }
        if (minIndent === null || indent.length < minIndent.length) {
            minIndent = indent;
        }
    }
    if (minIndent === null) {
        return text;
    }
    let result = []
    for (let i = 0; i < lines.length; i++) {
        result.push(lines[i].substr(minIndent.length));
    }
    return result.join("\n");
}

function main(state) {
    state.text = unindent(state.text);
}
