/**
	{
		"api":1,
		"name":"Format SQL",
		"description":"Cleans and format SQL Queries.",
		"author":"Ivan",
		"icon":"broom",
		"tags":"mysql,sql,prettify,clean,indent",
        "bias": -0.1
	}
**/

const { sql } = require('@boop/vkBeautify')


function main(state) {
	state.text = sql(state.text)	
}
