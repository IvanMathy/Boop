/**
  {
    "api":1,
    "name":"Convert selection to Title Case",
    "description":"Convert to Title Case",
    "author":"Kris Linquist",
    "icon":"type",
    "tags":"title,case"
  }
**/

function main(input) {

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const noCaps = ['a', 'an', 'the', 'for', 'and', 'nor', 'but', 'or', 'yet', 'so', 'at', 'around', 'by', 'after', 'along', 'for', 'from', 'of', 'on', 'to', 'with', 'without'];

    const newString = [];
    const words = input.text.split(' ');

    for (let i = 0; i < words.length; i++) {
        //First and last
        if (i == 0 || i + 1 == words.length) {
            newString.push(capitalizeFirstLetter(words[i]));
        } else {
            if (noCaps.indexOf(words[i].toLowerCase()) > -1){
                newString.push(words[i].toLowerCase());
            } else {
                newString.push(capitalizeFirstLetter(words[i]));
            }
        }
    }

    input.text = newString.join(' ');
}