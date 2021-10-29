/**
  {
    "api":1,
    "name":"Untypable Filter",
    "description":"Removes untypable characters from your text",
    "author":"OIRNOIR",
    "icon":"type",
    "tags":"remove,typable,unicode,ascii,untypable"
  }
**/

function main(state) {
  const matchedText = state.text.match(/[ -~]/g);
  if (matchedText == null || matchedText.length == 0) {
    state.text = "";
  } else {
    state.text = matchedText.join("");
  }
}
