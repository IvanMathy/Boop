/**
	{
		"api":1,
		"name":"CSV to JSON",
		"description":"Converts comma-separated tables to JSON.",
		"author":"Ivan",
		"icon":"table",
		"tags":"table,convert"
	}
**/

// Inspired by https://github.com/30-seconds/30-seconds-of-code

function main(state) {
	try {
		const delimiter = ','
		const data = state.text
		const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
		state.text = JSON.stringify(data
			.slice(data.indexOf('\n') + 1)
			.split('\n')
			.map(v => {
				const values = v.split(delimiter);
				return titles.reduce((obj, title, index) => ((obj[title] = values[index]), obj), {});
			}), null, 2);
	}
	catch(error) {
		state.postError("Invalid CSV")
	}
	
	
}
