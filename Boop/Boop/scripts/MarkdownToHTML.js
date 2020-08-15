/**
    {
        "api":1,
        "name":"Markdown to HTML",
        "description":"Converts Markdown to HTML",
        "author":"See Source",
        "icon":"HTML",
        "tags":"html,markdown,convert"
    }
**/

const markdownIt = require('@boop/markdown-it');

function main(input) {
    const md = new markdownIt();
    input.text = md.render(input.text);
}
