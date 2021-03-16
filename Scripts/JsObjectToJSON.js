/**
    {
        "api":1,
        "name":"JS Object to JSON",
        "description":"Converts a javascript object to JSON format",
        "author":"luisfontes19",
        "icon":"HTML",
        "tags":"json,js,object,convert",
        "bias": -0.1
    }
**/

function main(state) {

  try {
    const data = state.text;
    eval("parsed = " + data);
    state.text = JSON.stringify(parsed);
  }
  catch (ex) {
    state.postError(ex.message);
  }
}