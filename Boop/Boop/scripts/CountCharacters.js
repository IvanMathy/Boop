/**
	{
		"api":1,
		"name":"Count Characters",
		"description":"Get the length of your text",
		"author":"Ivan",
		"icon":"counter",
		"tags":"count,length,size,character"
	}
**/


const { size } = require('@boop/lodash.boop')

function main(input) {
	
	input.postInfo(`${size(input.text)} characters`)
	
}

