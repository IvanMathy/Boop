/**
	{
		"api":1,
		"name":"Trim Query String from URL",
		"description":"Cleans up a URL by removing the query string.",
		"author":"Seth Soffer",
		"icon":"link",
		"tags":"url,trim,querystring,query string",
	}
 **/
function main(state){
	const url = state.text;
	const queryIndex = url.indexOf('?');
	if(queryIndex > -1){
		state.text = url.slice(0, queryIndex);
	}
}
1
