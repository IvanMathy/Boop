/**
  {
    "api":1,
    "name":"Timestamp to Date",
    "description":"Converts Unix timestamp (epoch) to human-readable",
    "author":"jpinkham",
    "icon":"watch",
    "tags":"convert,time"
  }
**/

function main(state) {
    let epochtime = state.fullText;

    // Create a new JavaScript Date object based on the provided timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(epochtime * 1000);

    // Customize output format to the current locale settings
    let human_date = date.toLocaleString();
    state.insert("\n" + human_date);
}
