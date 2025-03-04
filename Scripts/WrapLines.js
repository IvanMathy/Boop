/**
 {
 "api": 1,
 "name": "Wrap Lines",
 "description": "Adds a line break after 77 characters",
 "author": "Rex",
 "icon": "scissors",
 "tags": "line break,line,wrap,wrap lines"
 }
 **/

function main(state) {
    state.text = wrapText(state.text);
}

function wrapText(text, length = 77) {
    return text.replace(new RegExp(`(.{1,${length}})`, 'g'), '$1\n');
}
