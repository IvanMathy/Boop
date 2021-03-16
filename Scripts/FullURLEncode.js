/**
    {
        "api":1,
        "name":"URL Encode (full)",
        "description":"URL Encodes all characters",
        "author":"luisfontes19",
        "icon":"link",
        "tags":"url,encode,full",
    }
**/


function fullUrlEncode(str) {
    var encoded = '';

    for (var i = 0; i < str.length; i++) {
        var h = parseInt(str.charCodeAt(i)).toString(16);
        encoded += '%' + h;
    }

    return encoded;
}

function main(state) {
    state.text = fullUrlEncode(state.text);
}