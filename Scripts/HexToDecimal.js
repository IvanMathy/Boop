/**
  {
    "api":1,
    "name":"Hexadecimal to Decimal",
    "description":"Converts base 16 number to base 10",
    "author":"Giorgioskij",
    "icon":"abacus",
    "tags":"hexadecimal, hex, decimal, convert, base"
  }
**/

function main(state) {

    let inputString = state.text;

    let regex = /^[0-9a-fA-F]+$/;

    if (!regex.test(inputString)) {
        state.postError("Invalid hexadecimal number");
        return;
    }

    let hNumber = parseInt(inputString, 16);

    state.text = hNumber;
}