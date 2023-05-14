/**
 {
        "api":1,
        "name":"Generate current timestamp",
        "description":"Generate current now time to Unix timestamp.",
        "author":"atovk",
        "icon":"watch",
        "tags":"date,time,calendar,unix,timestamp"
    }
 **/

function main(input) {

    let currentTimeMillis = Date.now()

    if (isNaN(currentTimeMillis)) {
        input.postError("Invalid Date")
    } else {
        input.insert(currentTimeMillis);
    }
}
