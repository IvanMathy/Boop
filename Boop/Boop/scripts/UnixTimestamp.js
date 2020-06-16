/**
    {
        "api":1,
        "name":"Unix Timestamp",
        "description":"Converts dates to Unix timestamp",
        "author":"Noah Halford",
        "icon":"watch",
        "tags":"date,time,calendar,unix,timestamp"
    }
**/

function main(input) {
    
    // replace space by T to allow dates in the form
    // yyyy-MM-dd HH:mm:ss or yyyy-MM-ddTHH:mm:ss
    let parsedDate = Date.parse(input.text.replace(" ","T"))
    
    if (isNaN(parsedDate)) {
        input.postError("Invalid Date")
    } else {
        input.text = parsedDate / 1000
    }
}
