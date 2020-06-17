/**
	{
		"api":1,
		"name":"Join Lines With Comma",
		"description":"Joins All Lines With a Comma",
		"author":"riesentoaster",
		"icon":"table",
		"tags":"join, comma",
        "bias": -0.1
	}
**/

function main(input) {
	input.text = input.text.replace('\n', ',');
}
