/**
	{
		"api":1,
		"name":"Farenheit to Centigrade",
		"description":"Convert temp from ºF to ºC.",
		"author":"armchairdeity",
		"icon":"translation",
		"tags":"join"
	}
**/

function main(state) {
	let foo = parseFloat(state.fullText);
	foo ?
		state.text = `${foo}°F = ${(((foo-32)*5)/9).toFixed(2)}°C` :
		state.fullText = "Please enter a number to be converted to Centigrade.";
}
