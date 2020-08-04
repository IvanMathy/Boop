/**
{
  "api": 1,
  "name": "Sponge Text",
  "description": "Randomly capitalizes letters to make it sarcastic",
  "author": "Paul Seelman",
  "icon": "dice",
  "tags": "sponge,spongetext,spongebob,spongebob text,sarcasm,sarcastic,random,caps,capitalized"
}
**/
function spongeText(string) {
  const chars = string.split("");
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * Math.floor(2));
    if (j == 0) {
        chars[i] = chars[i].toLowerCase();
    } else {
        chars[i] = chars[i].toUpperCase();
    }
  }

  return chars.join("");
}

function main(input) {
  input.text = spongeText(input.text);
}
