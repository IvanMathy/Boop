/**
	{
		"api":1,
		"name":"Hex To ASCII",
		"description":"Converts hexadecimal values into ASCII characters",
		"author":"aWZHY0yQH81uOYvH",
		"icon":"metamorphose",
		"tags":"hex,ascii,convert"
	}
**/

function main(state) {
	input = state.fullText.toUpperCase();
	buf = "";
	hexBuf = "";
	for(i = 0; i < input.length; i ++) {
		c = input.charAt(i);
		if("0123456789ABCDEF".includes(c)) {
 			hexBuf += c;
 			if(hexBuf.length >= 2) {
				buf += String.fromCharCode(parseInt(hexBuf, 16));
				hexBuf = "";
 			}
        } else if(c != ' ' && c != '\t' && c != '\n' && c != '\r') {
            state.postError("Text is not hex")
            throw "Not hex";
        }
	}
	state.fullText = buf;
}
