/**
	{
		"api":1,
		"name":"Base64 Encode",
		"description":"Encodes your text to Base64",
		"author":"See Source",
		"icon":"metamorphose",
		"tags":"base64,atob,encode"
	}
**/

function main(input) {
	
	input.text = base64encode(input.text)
	
}


/*
 * A Unicode friendly base64 encoder
 *
 *  Original: base64.js
 *    from dankogai/js-base64 (version: e2fdad7):
 *    https://github.com/dankogai/js-base64
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 *
 *  Modified: Jul 1 2020
 *    by CDFMLR
 *
 */

// constants
var b64chars
    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var b64tab = function(bin) {
    var t = {};
    for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
    return t;
}(b64chars);
var fromCharCode = String.fromCharCode;

// encoder stuff
var cb_utob = function(c) {
    if (c.length < 2) {
        var cc = c.charCodeAt(0);
        return cc < 0x80 ? c
            : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
                            + fromCharCode(0x80 | (cc & 0x3f)))
            : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
                + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
                + fromCharCode(0x80 | ( cc         & 0x3f)));
    } else {
        var cc = 0x10000
            + (c.charCodeAt(0) - 0xD800) * 0x400
            + (c.charCodeAt(1) - 0xDC00);
        return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
                + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
                + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
                + fromCharCode(0x80 | ( cc         & 0x3f)));
    }
};
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var utob = function(u) {
    return u.replace(re_utob, cb_utob);
};
var cb_encode = function(ccc) {
    var padlen = [0, 2, 1][ccc.length % 3],
    ord = ccc.charCodeAt(0) << 16
        | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
        | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
    chars = [
        b64chars.charAt( ord >>> 18),
        b64chars.charAt((ord >>> 12) & 63),
        padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
        padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
    ];
    return chars.join('');
};
var btoa = function(b) {
    if (b.match(/[^\x00-\xFF]/)) throw new RangeError(
        'The string contains invalid characters.'
    );
    return b.replace(/[\s\S]{1,3}/g, cb_encode);
};
var _encode = function(u) {
    return btoa(utob(String(u)));
};
var mkUriSafe = function (b64) {
    return b64.replace(/[+\/]/g, function(m0) {
        return m0 == '+' ? '-' : '_';
    }).replace(/=/g, '');
};
var encode = function(u, urisafe) {
    return urisafe ? mkUriSafe(_encode(u)) : _encode(u);
};
var encodeURI = function(u) { return encode(u, true) };
var fromUint8Array;
var fromUint8Array = function(a, urisafe) {
    // return btoa(fromCharCode.apply(null, a));
    var b64 = '';
    for (var i = 0, l = a.length; i < l; i += 3) {
        var a0 = a[i], a1 = a[i+1], a2 = a[i+2];
        var ord = a0 << 16 | a1 << 8 | a2;
        b64 +=    b64chars.charAt( ord >>> 18)
            +     b64chars.charAt((ord >>> 12) & 63)
            + ( typeof a1 != 'undefined'
                ? b64chars.charAt((ord >>>  6) & 63) : '=')
            + ( typeof a2 != 'undefined'
                ? b64chars.charAt( ord         & 63) : '=');
    }
    return urisafe ? mkUriSafe(b64) : b64;
};

// Default API， no urlsafe
function base64encode(str) {
    return encode(str);
}
