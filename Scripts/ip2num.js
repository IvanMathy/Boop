/**
	{
		"api":1,
		"name":"ip2num",
		"description":"Convert ip to number",
		"author":"Artem Bukin",
		"icon":"scissors",
		"tags":"convert,ip",
	}
**/

function dot2num(dot) 
{
    var d = dot.split('.');
    return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
}

function main(state) {
  
  state.text = dot2num(state.text);
}
