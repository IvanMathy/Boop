/**
    {
        "api":1,
        "name":"Generate GUID",
        "description":"Generates a psuedo-random GUID",
        "author":"joshspicer",
        "icon":"html",
        "tags":"guid"
    }
**/

// https://stackoverflow.com/a/2117523
function main(input) {
  input.text =  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
