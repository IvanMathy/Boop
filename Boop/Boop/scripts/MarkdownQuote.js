/**
    {
        "api":1,
        "name":"Quote (Markdown style)",
        "description":"Prepends > characters for each line, to match the style of a Markdown quote",
        "author":"Dan2552",
        "icon":"metamorphose",
        "tags":"quote,markdown"
    }
**/

function main(input) {
    input.text = input.text.split("\n").map(line => "> " + line).join("\n");
}
