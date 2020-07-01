/**
{
  "api": 1,
  "name": "Toggle Camel and Hyphen",
  "description": "Turns camelCase to camel-case and vice versa",
  "author": "Christian Heilmann",
  "icon": "table",
  "tags": "camelcase,hyphencase,syntax,codestandards"
}
**/

const toggleCamelHyphen = (str) => {
  if (str.indexOf('-') !== -1) {
    return str.replace(/\W+(.)/g, (x, chr) => {
      return chr.toUpperCase();
    });
  } else {
    return str.replace(/\W+/g, '-')
    .replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
  }
}

function main(input) {
  input.text = toggleCamelHyphen(input.text);
}
