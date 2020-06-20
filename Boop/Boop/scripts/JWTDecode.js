/**
  {
    "api":1,
    "name":"JWT Decode",
    "description":"Converts JWTs to JSON",
    "author":"Nils Sonemann",
    "icon":"metamorphose",
    "tags":"decode,jwt,token"
  }
**/

function main(input) {
    var t = input.text
    var jwtParts = t.split(".")
    if(jwtParts.length != 3) {
        input.postError("Invalid Token")
        return
    }

    var header = base64decode(jwtParts[0]);
    var payload = base64decode(jwtParts[1]);
    var signature = jwtParts[2];

    try {
        var fullJson = {
            "header": JSON.parse(header),
            "payload": JSON.parse(payload),
            "signature": signature
        }

        // Prettyprint the JSOM
        input.text = JSON.stringify(fullJson, null, 2);
    } catch(err) {
        input.postError("Error while parsing JSON")
    }
}

/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0
 * LastModified: Dec 25 1999
 * This library is free.  You can redistribute it and/or modify it.
 */
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
  /* c1 */
  do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
  } while(i < len && c1 == -1);
  if(c1 == -1)
      break;

  /* c2 */
  do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
  } while(i < len && c2 == -1);
  if(c2 == -1)
      break;

  out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

  /* c3 */
  do {
      c3 = str.charCodeAt(i++) & 0xff;
      if(c3 == 61)
    return out;
      c3 = base64DecodeChars[c3];
  } while(i < len && c3 == -1);
  if(c3 == -1)
      break;

  out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

  /* c4 */
  do {
      c4 = str.charCodeAt(i++) & 0xff;
      if(c4 == 61)
    return out;
      c4 = base64DecodeChars[c4];
  } while(i < len && c4 == -1);
  if(c4 == -1)
      break;
  out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}
