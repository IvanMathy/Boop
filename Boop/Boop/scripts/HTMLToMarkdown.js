/**
    {
        "api":1,
        "name":"HTML To Markdown",
        "description":"Converts HTML to Markdown",
        "author":"See Source",
        "icon":"HTML",
        "tags":"html,markdown,convert"
    }
**/

var TurndownService = require('@boop/turndown');

function main(input) {
    var turndownService = new TurndownService();
    input.text = turndownService.turndown(input.text);
}
