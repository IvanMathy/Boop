/**
	{
		"api":1,
		"name":"Join Lines With Space",
		"description":"Joins All Lines With a Space",
		"author":"riesentoaster",
		"icon":"table",
		"tags":"join, space",
        	"bias": -0.1
	}
**/

function main(input) {
	input.text = input.text.replace('\n', ' ');
}
