/**
	{
		"api":1,
		"name":"Date to Milliseconds",
		"description":"Converts a date to milliseconds since the UNIX epoch.",
		"author":"Seth Soffer",
		"icon":"watch",
		"tags":"date,unix,milliseconds,timestamp",
	}
 **/
function main(state){
	try{
		const parsedDate = Date.parse(state.text);
		if (isNaN(parsedDate)){
			state.postError("Invalid date.");
			return;
		}
		state.text = parsedDate;
	}
	catch (error){
		state.postError("Error parsing date.");
	}
}
