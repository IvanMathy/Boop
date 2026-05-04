/**
	{
		"api":1,
		"name":"ASCII To Hex",
		"description":"Converts ASCII characters to hexadecimal codes.",
		"author":"aWZHY0yQH81uOYvH",
		"icon":"metamorphose",
		"tags":"ascii,hex,convert"
	}
**/

function main(state) {
	buf = "";
	for(i = 0; i < state.fullText.length; i ++) {
		code = state.fullText.charCodeAt(i).toString(16);
		if(code.length < 2) buf += "0";
		buf += code;
	}
	state.fullText = buf.toUpperCase();
}
