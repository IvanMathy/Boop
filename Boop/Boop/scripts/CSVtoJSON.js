/**
	{
		"api":2,
		"name":"CSV to JSON",
		"description":"Converts comma-separated tables to JSON.",
		"author":"Ivan",
		"icon":"table",
		"tags":"table,convert",
        	"bias": -0.2
	}
**/
const Papa = require('@boop/papaparse.js');

function main(state) {
    try {
        const { data } = Papa.parse(state.text, { header:true });
        state.text = JSON.stringify(data, null, 2);
    }
    catch(error) {
        state.postError("Invalid CSV")
    }
}
