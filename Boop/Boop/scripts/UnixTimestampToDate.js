/**
  {
    "api":1,
    "name":"Unix timestamp to date",
    "description":"Converts Unix timestamp to date (local time zone)",
    "author":"Marat Saytakov, @m4rr",
    "icon":"watch",
    "tags":"timestamp,date,time"
  }
**/

function main(input) {
  let date = new Date(input.text * 1000);

  input.text = date;
}
