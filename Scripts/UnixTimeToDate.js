/**
	{
		"api":1,
		"name":"Timestamp to Date(ISO)",
		"description":"Converts a unix timestamp to a ISO Date string",
		"author":"riesentoaster",
		"icon":"collapse",
		"tags":"join, space",
		"bias": -0.1
	}
**/

function main(input) {
    input.text = input.text.trim();
    if (input.text.match(/^\d+$/)) {
        if (input.text.length == 13) {
            input.text = new Date(Number(input.text)).toISOString();
        } else if (input.text.length == 10) {
            input.text = new Date(Number(input.text)*1000).toISOString();
        } else {
            input.postError('Invalid timestamp (not 10 or 13 characters long)');
        }
    } else {
        input.postError('Invalid timestamp (not a number)');
    }
}