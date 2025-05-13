/**
	{
		"api":1,
		"name":"Join Lines With Comma and Single Quote",
		"description":"Joins all lines with a comma.",
		"author":"pweiss82",
		"icon":"collapse",
		"tags":"join, comma, single-quote",
		"bias": -0.1
	}
**/

function main(input) {
	// Wrap each line in single quotes and join with comma
	input.text = input.text.replace(/\n/g, "', '");
	input.text = "'" + input.text + "'";
}
