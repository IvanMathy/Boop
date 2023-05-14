/**
  {
    "api":1,
    "name":"Double Quotes to Singles",
    "description":"Converts all double quotes to single quotes",
    "author":"Joshfindit",
    "icon":"quote",
    "tags":"convert,quote,quotes,json"
  }
**/

function main(state) {
  try {
    state.text = state.fullText.replace(/"/g, "'")
  }
  catch(error) {
    state.postError("Something strange happened while trying to replace quotes")
  }
}
