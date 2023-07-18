/**
	{
		"api":1,
		"name":"Strip",
		"description":"Strip all whitespaces.",
		"author":"Artem Bukin",
		"icon":"scissors",
		"tags":"strip,whitespace,empty,space",
	}
**/

function main(state) {
  
  state.text = state.text.replace(/\s/g, '');
  
}
