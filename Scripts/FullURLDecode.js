/**
	{
		"api":1,
		"name":"URL Decode (full)",
		"description":"URL Decodes all characters",
		"author":"luisfontes19",
		"icon":"link",
		"tags":"url,decode,full",
	}
**/


function fullUrlDecode(str) {
	var codes = str.split("%");
	var decoded = '';

	for (var i = 0; i < codes.length; i++) {
		decoded += String.fromCharCode(parseInt(c, 16));
	}

}

function main(state) {
	state.text = fullUrlDecode(state.text);
}