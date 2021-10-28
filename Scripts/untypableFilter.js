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
  state.text = state.text.match(/[ -~]/g).join("");
}
