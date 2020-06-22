/**
    {
        "api":1,
        "name":"Randomize lines",
        "description":"Sorts the lines in a random order",
        "author":"chrismear",
        "icon":"broom",
        "tags":"random,sort,line"
    }
**/

function main(input) {
    let lines = input.text.split(/\r\n|\r|\n/);
    // Remove empty last line
    if (lines[lines.length-1] === "") {
      lines.pop();
    }
    // Fisher-Yates shuffle
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = lines[i];
      lines[i] = lines[j];
      lines[j] = temp;
    }
    input.text = lines.join("\n");
}
