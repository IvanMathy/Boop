/**
  {
    "api":1,
    "name":"JWT Decode",
    "description":"Converts JWTs to JSON",
    "author":"Nils Sonemann",
    "icon":"identification",
    "tags":"decode,jwt,token"
  }
**/


const { base64decode } = require('@boop/base64')

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
