/**
	{
		"api":1,
		"name":"URL Decode",
		"description":"Decodes URL entities in your text.",
		"author":"Ivan",
		"icon":"link",
		"tags":"url,decode,convert"
	}
**/

function main(input) {
	
	input.text = decodeURIComponent(input.text)
	
}