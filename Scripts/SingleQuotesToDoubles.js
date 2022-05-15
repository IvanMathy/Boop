/**
  {
    "api":1,
    "name":"Single Quotes to Doubles",
    "description":"Converts all single quotes to double quotes",
    "author":"Joshfindit",
    "icon":"quote",
    "tags":"convert,quote,quotes,json"
  }
**/

function main(state) {
  try {
    state.text = state.fullText.replace(/'/g, '"')
  }
  catch(error) {
    state.postError("Something strange happened while trying to replace quotes")
  }
}
