/**
  {
    "api":1,
    "name":"Binary to Hexadecimal",
    "description":"Converts binary number to base 16",
    "author":"Giorgioskij",
    "icon":"abacus",
    "tags":"binary, bin, hex, hexadecimal, 16, convert, base"
  }
**/

function main(state) {

    let inputString = state.text;

    const regex = /^[0-1]+$/;

    if (!regex.test(inputString)) {
        state.postError("Invalid binary number");
        return;
    }

    let bNumber = parseInt(inputString, 2);

    state.text = bNumber.toString(16);
}