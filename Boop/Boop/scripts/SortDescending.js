/**
	{
		"api":1,
		"name":"Sort Descending",
		"description":"Sorts the lines descending.",
		"author":"andipaetzold",
		"icon":"unknown",
		"tags":"sort,descending,desc"
	}
**/

function main(input) {

	input.text = input.text.split('\n').sort().reverse().join('\n')

}