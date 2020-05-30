/**
	{
		"api":1,
		"name":"UTC Date Converter",
		"description":"Converts dates and timestamps to UTC dates",
		"author":"Ivan",
		"icon":"watch",
		"tags":"date,time,calendar"
	}
**/

function main(input) {

    let string = input.text
    
    let parsedDate = Date.parse(string)
    
    if (isNaN(parsedDate)) {
        parsedDate = new Date(parseInt(string))
    } else {
        parsedDate = new Date(parsedDate)
    }
    
    let out = parsedDate.toUTCString()
    
    if(out === "Invalid Date") {
        input.postError(out)
    }
    
    input.text = out
}
