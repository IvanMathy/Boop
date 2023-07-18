/**
	{
		"api":1,
		"name":"num2ip",
		"description":"Convert number to ip",
		"author":"Artem Bukin",
		"icon":"scissors",
		"tags":"convert,ip",
	}
**/

function num2dot(num) 
{
    var d = num%256;
    for (var i = 3; i > 0; i--) 
    { 
        num = Math.floor(num/256);
        d = num%256 + '.' + d;
    }
    return d;
}

function main(state) {
  
  state.text = num2dot(state.text);
}
