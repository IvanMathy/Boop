/**
  {
    "api":1,
    "name":"Decimal to Binary",
    "description":"Converts base 10 number to base 2",
    "author":"Giorgioskij",
    "icon":"abacus",
    "tags":"decimal, dec, binary, bin, convert, decimal, base"
  }
**/

function main(state) {

    let inputString = state.text;

    let regex = /^\d+$/;

    if (!regex.test(inputString)) {
        state.postError("Invalid decimal number");
        return;
    }

    let dNumber = parseInt(inputString);

    state.text = dNumber.toString(2);
}