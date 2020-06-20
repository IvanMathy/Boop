/**
	{
		"api":1,
		"name":"Reverse Lines",
		"description":"Flip upside down",
		"author":"@Clarko",
		"icon":"flip",
		"tags":"reverse,order,invert,mirror,flip,upside,down"
	}
**/

function main(input) {
	input.text = input.text.split('\n').reverse().join('\n')
	
}