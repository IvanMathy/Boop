/**
  {
    "api":1,
    "name":"Wrap Characters in Quotes",
    "description":"Split string into characters, wrap in quote marks, and make new string",
    "author":"Andy",
    "icon":"hurricane",
    "tags":"quote, split, string, characters"
  }
**/

function main(state) {
  try {
    let string = state.text;
    let arrayFromString = Array.from(string);
    let newString = arrayFromString.join("', '");
    let fixedString = "'" + newString + "'";
    state.text = fixedString;
  }
  catch(error) {
    state.postError("Something messed up happened when trying to wrap the characters!")
  }
}
