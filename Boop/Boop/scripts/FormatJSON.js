/**
	{
		"api":1,
		"name":"Format JSON",
		"description":"Cleans and format JSON documents.",
		"author":"Ivan",
		"icon":"broom",
		"tags":"prettify,clean,indent"
	}
**/

function main(input) {
	// I feel like this should have a real parser/formatter
	// but hey, it works so who am I to judge?
	input.text = JSON.stringify(JSON.parse(input.text), null, 2);
	
}
