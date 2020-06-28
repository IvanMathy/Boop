/**
	{
		"api":1,
		"name":"Trim",
		"description":"Trims leading and trailing whitespace",
		"author":"Joshua Nozzi",
		"icon":"trim",
		"tags":"trim,whitespace,empty,space",
	}
**/

function main(state) {
  
  state.text = state.text.trim();
  
}
