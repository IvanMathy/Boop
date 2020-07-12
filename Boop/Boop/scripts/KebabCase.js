/**
	{
		"api":1,
		"name":"Kebab Case",
		"description":"converts-your-text-to-kebab-case.",
		"author":"Ivan",
		"icon":"metamorphose",
		"tags":"kebab,case,function,lodash"
	}
**/

const { kebabCase } = require('@boop/lodash.boop')

function main(input) {
	
    input.text = kebabCase(input.text)
	
}
