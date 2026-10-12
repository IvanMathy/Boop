/**
 {
   "api": 1,
   "name": "Decimal to Hex",
   "description": "Converts decimal values to hexadecimal.",
   "author": "Maurice",
   "icon": "metamorphose",
   "tags": "decimal,hexadecimal,dec,hex"
 }
 **/

function main(state) {
  var text = state.text;
  var lines = text.split(/\n/);
  var result = "";

  for (const index in lines) {
    var text = lines[index].trim();

    if (/^[+-]?\d+$/.test(text)) {
      result += decimalToHex(text);
    } else if (isNaN(text)) {
      result += text;
    } else {
      result += parseInt(text).toString(16).toUpperCase();
    }

    result += "\n";
  }

  state.text = result.trim();
}

function decimalToHex(text) {
  var negative = text.charAt(0) === "-";
  var digits = text.replace(/^[+-]/, "").replace(/^0+/, "");
  var result = "";

  // Divide decimal digits by 16 without rounding the input to a Number.
  while (digits.length > 0) {
    var quotient = "";
    var remainder = 0;
    for (var i = 0; i < digits.length; i++) {
      var value = remainder * 10 + parseInt(digits.charAt(i), 10);
      var digit = Math.floor(value / 16);
      if (digit !== 0 || quotient.length > 0) {
        quotient += digit;
      }
      remainder = value % 16;
    }
    result = "0123456789ABCDEF".charAt(remainder) + result;
    digits = quotient;
  }

  return result ? (negative ? "-" : "") + result : "0";
}
