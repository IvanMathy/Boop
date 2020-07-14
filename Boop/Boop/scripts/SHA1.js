/**
    {
        "api":1,
        "name":"SHA1 Hash",
        "description":"Computes the SHA1 hash of your text (Hex encoded)",
        "icon":"fingerprint",
        "tags":"strip,slashes,remove"
    }
**/

const Hashes = require('@boop/hashes')

function main(state) {
  var SHA1 = new Hashes.SHA1;
  state.text = SHA1.hex(state.text)
}
