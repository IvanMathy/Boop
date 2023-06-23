/**
	{
		"api": 1,
		"name": "Uncomment Text w/ Paragraphs",
		"description": "Removes comment markers and restores the commented text to a block of text while maintaining paragraph breaks.",
		"author": "benniefolyfe",
		"icon": "quote",
		"tags": "uncomment,text,paragraph breaks"
	}
**/

function main(state) {
	try {
		// Extract the text from the state
		const text = state.fullText;

		// Split the text into paragraphs
		const commentedParagraphs = text.split('\n\n');

		// Process each commented paragraph separately
		const restoredParagraphs = commentedParagraphs.map(restoreParagraph);

		// Join the paragraphs with paragraph breaks and assign the restored text back to the state.text property
		state.text = restoredParagraphs.join('\n\n');
	} catch (error) {
		state.postError("Something went wrong while processing the text: " + error.message);
	}
}

function restoreParagraph(commentedParagraph) {
	// Remove comment markers and leading whitespace from each line
	const lines = commentedParagraph.split('\n').map(line => line.replace(/\/\/\s?/g, '').trim());

	return lines.join(' ');
}
