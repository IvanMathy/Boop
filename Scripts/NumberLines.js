/**
	{
		"api":1,
		"name":"Number Lines",
		"description":"Place line number before line.",
		"author":"river-quitslund",
		"icon":"counter",
		"tags":"number,line,order"
	}
**/

function main(input) {
	let lines = input.text.split('\n')
	for (let line = 1; line <= lines.length; line++) {
		lines[line - 1] = line + "\t" + lines[line - 1]
	}
	input.text = lines.join('\n')
}
