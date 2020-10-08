/**
	{
		"api":1,
		"name":"UUID V4",
		"description":"Generates a v4 UUID. Not crypto safe",
		"author":"luisfontes19",
		"icon":"type",
		"tags":"uuid",
		"bias": -0.1
	}
**/

//taken from https://stackoverflow.com/a/2117523
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function main(state) {
	state.insert(uuidv4());
}