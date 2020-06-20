/**
<<<<<<< HEAD
	{
		"api":1,
		"name":"Shuffle Lines",
		"description":"Randomize each line of your text",
		"author":"@Clarko",
		"icon":"dice",
		"tags":"shuffle,random"
	}
**/

function main(input) {
	let lines = input.text.split('\n');
	let j = lines.length;

	// Fisher-Yates Shuffle
	while (j) {
		i = Math.floor(Math.random() * j--);
		temp = lines[j];
		lines[j] = lines[i];
		lines[i] = temp;
	}
	
	input.text = lines.join('\n');
=======
{
  "api": 1,
  "name": "Shuffle lines",
  "description": "Shuffles lines randomly",
  "author": "Christian Petersen",
  "icon": "unknown",
  "tags": "shuffle,random,line"
}
**/
function shuffleString(string) {
  const chars = string.split("\n");

  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("\n");
}

function main(input) {
  input.text = shuffleString(input.text);
>>>>>>> pr/39
}
