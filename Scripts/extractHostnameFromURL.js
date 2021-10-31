/**
	{
		"api":1,
		"name":"Extract Hostname from URL",
		"description":"Extract Hostname from URL",
		"author":"susil95",
		"icon":"HTML",
		"tags":"url,hostname,extract"
	}
**/

function main(state) {
	try {
		const lines = state.text.split(/\n/);
		let temp = "";
		for (let i = 1; i < lines.length; i++) {
			const line = lines[i];
	
			temp += line.match("^(?:http[s]?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?(?:web\.)?([^:\/\n]+)")[1];
			temp += "\n";
		}
		state.text = temp;
	}
	catch(error) {
		state.postError(error.message);
	}
}

var script = `
/**
	{
		"api":1,
		"name":"New Boop Script",
		"description":"What does your script do?",
		"author":"Whooooooo are you?",
		"icon":"broom",
        "tags":"place,tags,here",
        "bias":0.0
	}
**/

function main(state) {
	try {
        
        /*
        The 'state' object has three properties to deal with text: text, fullText, and selection.

        state.fullText will contain or set the entire string from the Boop editor, regardless of whether a selection is made or not.
        state.selection will contain or set the currently selected text, one at a time if more that one selection exists.
        state.text will behave like selection if there is one or more selected piece of text, otherwise it will behave like fullText.
        */

		state.fullText = state.selection; // Remove all but selected text
	}
	catch(error) {
		state.postError("Explain what went wrong here...")
	}
	
}
`
