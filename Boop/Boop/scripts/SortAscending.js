/**
	{
		"api":1,
		"name":"Sort Ascending",
		"description":"Sorts the lines ascending.",
		"author":"andipaetzold",
		"icon":"metamorphose",
		"tags":"sort,ascending,asc"
	}
**/

function main(input) {

	input.text = input.text.split('\n').sort().join('\n')

}
