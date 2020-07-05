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

const { encode } = require('@boop/base64')

function main(input) {
	
	input.text = encode(input.text)
	
}
