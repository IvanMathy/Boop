/**
	{
		"api":1,
		"name":"Deburr",
		"description":"Converts your text to basic latin characters.",
		"author":"Ivan",
		"icon":"colosseum",
		"tags":"burr,special,characters,function,lodash"
	}
**/

const { deburr } = require('@boop/lodash.boop')

function main(input) {
	
    input.text = deburr(input.text)
	
}
