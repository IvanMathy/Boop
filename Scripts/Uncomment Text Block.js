/**
	{
		"api": 1,
		"name": "Uncomment and Restore",
		"description": "Removes comment markers and restores the commented text to a cohesive paragraph.",
		"author": "benniefolyfe",
		"icon": "quote",
		"tags": "uncomment,text"
	}
**/

function main(state) {
	try {
		// Extract the text from the state
		const text = state.fullText;

		// Remove comment markers and leading whitespace from each line
		const uncommentedLines = text.split('\n').map(line => line.replace(/\/\/\s?/g, '').trim());

		// Join the lines into a cohesive paragraph
		const uncommentedText = uncommentedLines.join(' ');

		// Assign the uncommented text back to the state.text property
		state.text = uncommentedText;
	} catch (error) {
		state.postError("Something went wrong while processing the text: " + error.message);
	}
}
