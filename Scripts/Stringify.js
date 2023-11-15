/**
{
  "api": 1,
  "name": "Stringify JSON",
  "description": "Stringify JSON to a single line",
  "author": "rcalixte",
  "icon": "type",
  "tags": "convert,stringify,json"
}
**/
function main(input) { 
  input.text = JSON.stringify(input.text.replace(/\n\s*/g, ''));
} 
