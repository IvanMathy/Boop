/**
	{
		"api":1,
		"name":"Start Case",
		"description":"Converts Your Text To Start Case.",
		"author":"Ivan",
		"icon":"type",
		"tags":"start,case,function,lodash"
	}
**/

const { startCase } = require('@boop/lodash.boop')

function main(input) {
	
    input.text = startCase(input.text)
	
}
