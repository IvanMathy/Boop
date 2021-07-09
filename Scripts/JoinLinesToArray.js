/**
	{
		"api":1,
		"name":"Join Lines Into A JS Array",
		"description":"Joins all lines into an array format: [\"line 1\", \"line 2\"].",
		"author":"Kris Linquist",
		"icon":"collapse",
		"tags":"join, array",
		"bias": -0.1
	}
**/

function main(input) {
    const txt = input.text.split('\n');
    const newDataArr = [];
    for (let i = 0; i < txt.length; i++){
        if (txt[i].match(/^[-+]?[0-9]*\.?[0-9]+$/)){
            newDataArr.push(Number(txt[i]));
        } else {
            newDataArr.push(txt[i].trim());
        }
    }
    input.text = JSON.stringify(newDataArr);
}
