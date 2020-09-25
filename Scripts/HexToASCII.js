/**
	{
		"api":1,
		"name":"Hex To ASCII",
		"description":"Converts hex into ASCII characters",
		"author":"aWZHY0yQH81uOYvH",
		"icon":"metamorphose",
		"tags":"hex,ascii,convert"
	}
**/

function main(state) {
	buf = "";
	for(i = 0; i < state.fullText.length; i += 2)
		buf += String.fromCharCode(parseInt(state.fullText.substring(i, i+2), 16));
	state.fullText = buf;
}