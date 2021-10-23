/**
 {
   "api": 1,
   "name": "Binary to Decimal",
   "description": "Converts binary values to decimal.",
   "author": "Maurice",
   "icon": "metamorphose",
   "tags": "decimal,binary,dec,bin"
 }
 **/

function main(state) {
  var text = state.text;
  var lines = text.split(/\n/);
  var result = "";

  for (const index in lines) {
    var text = lines[index].trim();
    var decimal = parseInt(text, 2);

    if (isNaN(decimal)) {
      result += text;
    } else {
      result += decimal;
    }

    result += "\n";
  }

  state.text = result.trim();
}
