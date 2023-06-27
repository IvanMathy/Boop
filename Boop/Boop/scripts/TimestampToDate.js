/**
    {
        "api":1,
        "name":"Timestamp to Date",
        "description":"Converts a Unix timestamp to a date.",
        "author":"Andrew Judd",
        "icon":"watch",
        "tags":"date,time,calendar,unix,timestamp"
    }
**/

function main(input) {

    let parsedDate = new Date(+input.text * 1000)

    if (isNaN(parsedDate)) {
        input.postError("Invalid Date")
    } else {
        input.text = parsedDate
    }
}
