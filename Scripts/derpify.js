/**
{
  "api": 1,
  "name": "Derpify",
  "description": "Turns 'but I want loops in CSS' into 'BUt i WaNt LoOPS iN CSS'",
  "author": "Christian Heilmann",
  "icon": "table",
  "tags": "derp,Meme,text"
}
**/

function derpify(str, rand = 0.3) {
	return str.toLowerCase().split('').map(
		c => (Math.random() < rand) ? c : c.toUpperCase()
	).join('');
};

function main(input) {
  input.text = derpify(input.text);
}


