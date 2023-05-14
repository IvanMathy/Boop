/**
	{
		"api":1,
		"name":"Remove Empty Lines",
		"description":"Removes empty lines.",
		"author":"chsxf (https://chsxf.dev)",
		"icon":"broom",
		"tags":"clean,remove,empty,lines"
	}
**/

function main(input) {
	try {
		let lines = input.text.split("\n")
		var result = []
		for (let line of lines) {
			let trimmed = line.trim();
			if (trimmed.length > 0) {
				result.push(line);
			}
		}
		input.text = result.join("\n");
	}
	catch(error) {
		state.postError("Something strange happened here...")
	}
}
