/**
	{
		"api":1,
		"name":"Test Script",
		"description":"Testing script",
		"author":"Ivan",
		"icon":"quote",
		"tags":"test,test,one,two"
	}
**/

function main(input) {
	
	input.postInfo("Hello this is a test!")
	
	input.fullText = `Hello, World! Let's try some syntax highlighting shall we?

var test: String? = "Toast"

{
	"name": "Boop",
	"type": "software",
	"info": { "tags": ["software", "editor"] }
}

The MD5 of \`truth\` is 68934a3e9455fa72420237eb05902327

`
	
}
