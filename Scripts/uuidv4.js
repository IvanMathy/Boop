/**
    {
        "api": 1,
        "name": "UUID v4",
        "description": "Generate random UUID",
        "icon": "dice",
        "tags": "uuid,guid,random"
    }
**/

// Shamelessly cribbed from Stack Exchange
// https://stackoverflow.com/a/2117523
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function main(state) {
    state.insert(uuidv4());
}
