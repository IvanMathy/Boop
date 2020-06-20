/**
    {
        "api":1,
        "name":"Collapse to single line",
        "description":"Removes all linebreaks and creates a document with only a single line",
        "author":"Dennis",
        "icon":"table",
        "tags":"strip,remove,collapse"
    }
**/

function main(input) {
    input.postInfo(`${input.text.split(/\r\n|\r|\n/).length} line(s) collapsed`)
    input.fullText = input.text.replace(/\r?\n|\r/g, "")
}
