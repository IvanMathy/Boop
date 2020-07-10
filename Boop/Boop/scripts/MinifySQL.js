/**
	{
		"api":1,
		"name":"Minify SQL",
		"description":"Cleans and minifies SQL queries.",
		"author":"Ivan",
		"icon":"broom",
		"tags":"mysql,sql,minify,clean,indent",
        "bias": -0.1
	}
**/

const { sqlmin } = require('@boop/vkBeautify')


function main(state) {
	state.text = sqlmin(state.text)	
}
