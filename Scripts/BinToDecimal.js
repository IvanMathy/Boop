/**
  {
    "api":1,
    "name":"Binary to Decimal",
    "description":"Converts binary number to base 10",
    "author":"Giorgioskij",
    "icon":"abacus",
    "tags":"bin, binary, convert, decimal, base"
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

    state.text = bNumber;
}