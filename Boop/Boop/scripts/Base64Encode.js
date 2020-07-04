/**
	{
		"api":1,
		"name":"Base64 Encode",
		"description":"Encodes your text to Base64",
		"author":"See Source",
		"icon":"metamorphose",
		"tags":"base64,atob,encode"
	}
**/

const { base64encode } = require('lib/base64')

function main(input) {
	
	input.text = base64encode(input.text)
	
}
