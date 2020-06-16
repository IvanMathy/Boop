/**
{
  "api": 1,
  "name": "Shuffle lines",
  "description": "Shuffles lines randomly",
  "author": "Christian Petersen",
  "icon": "unknown",
  "tags": "shuffle,random,line"
}
**/
function shuffleString(string) {
  const chars = string.split("\n");

  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("\n");
}

function main(input) {
  input.text = shuffleString(input.text);
}
