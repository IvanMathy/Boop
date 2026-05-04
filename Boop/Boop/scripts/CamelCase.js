/**
	{
		"api":1,
		"name":"Camel Case",
		"description":"convertsYourTextToCamelCase",
		"author":"Ivan",
		"icon":"camel",
		"tags":"camel,case,function,lodash"
	}
**/

const { camelCase } = require('@boop/lodash.boop')

function main(input) {
	
    input.text = camelCase(input.text)
	
}
