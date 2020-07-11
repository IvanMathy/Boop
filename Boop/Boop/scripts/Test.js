/**
	{
		"api":1,
		"name":"Ivan's Super Cool Script",
		"description":"Testing script",
		"author":"Ivan",
		"icon":"quote",
		"tags":"test,test,one,two"
	}
**/

function main(input) {


	console.log("Hello from console.log!")
	console.warn("Hello from console.warn!")
	console.error("Hello from console.error!")
	console.info("Info - here's a console.trace:")
	console.trace()
	
	input.postInfo("Hello this is a test!")
	
	input.fullText = `Hello, World! Let's try some syntax highlighting shall we?

var test: String? = "Toast"

{
    "name": "Boop",
    "type": "software",
    "info": {
        "tags": ["software", "editor"]
    },
    "useful": false,
    "version": 1.2345e-10
}

The MD5 of \`truth\` is 68934a3e9455fa72420237eb05902327
    
SELECT "Hello" FROM table LIMIT 2

/*
 haha you can't see me 👻
*/
    
if(false) return;  // this doesn't work
    
This line was added on Fri, 19 Jun 2020 01:01:30 GMT
    
<div class="hello">World</div>
    

"This is quote-unquote \\"escaped\\" if you will."
`
	
}
