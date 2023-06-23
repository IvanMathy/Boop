/**
	{
		"api": 1,
		"name": "Commented Text Block w/ Paragraph",
		"description": "Converts a block of text into a commented text block with max length of 66 characters and line breaks before or after words.",
		"author": "Your Name",
		"icon": "quote",
		"tags": "comment,text,line break"
	}
**/

function main(state) {
	try {
		// Extract the text from the state
		const text = state.fullText;

		// Split the text into paragraphs
		const paragraphs = text.split('\n\n');

		// Process each paragraph separately
		const commentedParagraphs = paragraphs.map(processParagraph);

		// Join the paragraphs with paragraph breaks and assign the commented text back to the state.text property
		state.text = commentedParagraphs.join('\n\n');
	} catch (error) {
		state.postError("Something went wrong while processing the text: " + error.message);
	}
}

function processParagraph(paragraph) {
	// Split the paragraph into words
	const words = paragraph.split(/\s+/);

	// Create commented lines with line breaks before or after words
	const commentedLines = createCommentedLines(words);

	// Join the lines with line breaks
	const commentedParagraph = commentedLines.join('\n');

	return commentedParagraph;
}

function createCommentedLines(words) {
	const lines = [];
	let currentLine = '';
	let lineLength = 0;

	for (const word of words) {
		const wordLength = word.length;

		// Check if adding the word would exceed the character limit
		if (lineLength + wordLength + 3 > 66) { // 3 accounts for comment markers and space

				// Add the current line to the list
				lines.push(currentLine);

				// Reset the line for the next line
				currentLine = '';
				lineLength = 0;
		}

		// Add the word to the current line
		if (currentLine !== '') {
			currentLine += ' ';
			lineLength++;
		}
		currentLine += word;
		lineLength += wordLength;
	}

	// Add the last line to the list
	if (currentLine !== '') {
		lines.push(currentLine);
	}

	// Add comment markers to each line
	const commentedLines = lines.map(line => `// ${line}`);

	return commentedLines;
}
