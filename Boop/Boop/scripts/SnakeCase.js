/**
	{
		"api":1,
		"name":"Snake Case",
		"description":"converts_your_text_to_snake_case.",
		"author":"Ivan",
		"icon":"snake",
		"tags":"snake,case,function,lodash"
	}
**/

const { snakeCase } = require('@boop/lodash.boop')

function main(input) {
	
    input.text = snakeCase(input.text)
	
}
