/**
	{
		"api":1,
		"name":"Base64 Decode",
		"description":"Decodes your text from Base64",
		"author":"See Source",
		"icon":"metamorphose",
		"tags":"base64,btoa,decode"
	}
**/

function main(input) {
	
	input.text = base64decode(input.text)
	
}

/*
 * A Unicode friendly base64 decoder
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

// decoder stuff
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = function(cccc) {
    switch(cccc.length) {
    case 4:
        var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
            |    ((0x3f & cccc.charCodeAt(1)) << 12)
            |    ((0x3f & cccc.charCodeAt(2)) <<  6)
            |     (0x3f & cccc.charCodeAt(3)),
        offset = cp - 0x10000;
        return (fromCharCode((offset  >>> 10) + 0xD800)
                + fromCharCode((offset & 0x3FF) + 0xDC00));
    case 3:
        return fromCharCode(
            ((0x0f & cccc.charCodeAt(0)) << 12)
                | ((0x3f & cccc.charCodeAt(1)) << 6)
                |  (0x3f & cccc.charCodeAt(2))
        );
    default:
        return  fromCharCode(
            ((0x1f & cccc.charCodeAt(0)) << 6)
                |  (0x3f & cccc.charCodeAt(1))
        );
    }
};
var btou = function(b) {
    return b.replace(re_btou, cb_btou);
};
var cb_decode = function(cccc) {
    var len = cccc.length,
    padlen = len % 4,
    n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
        | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
        | (len > 2 ? b64tab[cccc.charAt(2)] <<  6 : 0)
        | (len > 3 ? b64tab[cccc.charAt(3)]       : 0),
    chars = [
        fromCharCode( n >>> 16),
        fromCharCode((n >>>  8) & 0xff),
        fromCharCode( n         & 0xff)
    ];
    chars.length -= [0, 0, 2, 1][padlen];
    return chars.join('');
};
var _atob = function(a){
    return a.replace(/\S{1,4}/g, cb_decode);
};
var atob = function(a) {
    return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g, ''));
};
var _decode = function(a) { return btou(_atob(a)) };
var decode = function(a){
    return _decode(
        String(a).replace(/[-_]/g, function(m0) {
            return m0 == '-' ? '+' : '/'
        }).replace(/[^A-Za-z0-9\+\/]/g, '')
    );
};
var toUint8Array = function(a) {
    return Uint8Array.from(atob(a), function(c) {
        return c.charCodeAt(0);
    });
};

// Default API
function base64decode(str) {
    return decode(str)
}
