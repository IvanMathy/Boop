/**
	{
		"api":1,
		"name":"Centigrade to Farenheit",
		"description":"Convert temp from ºC to ºF.",
		"author":"armchairdeity",
		"icon":"translation",
		"tags":"join"
	}
**/

function main(state) {
	let foo = parseFloat(state.fullText);
	(foo != "NaN") ?
		state.fullText = `${foo}°C = ${(((foo*9)/5)+32).toFixed(2)}°F` :
		state.fullText = "Please enter a number to be converted to Centigrade.";
}
