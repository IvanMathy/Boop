# Modules

Just to be very clear before we get started: **Boop does not support commonJS/node/ES6 modules**. It has a custom import system that may or may not be compatible with some existing modules.

## Importing modules

To import a module, use the require function. It'll will return the contents of `module.exports`:

```javascript
const test = require('lib/testLib')
const test = require('modules/otherLib.js')
```

If you do not include a `.js` extension, the system will add one automatically.

You can also use destructuring to only get a single function out:

```javascript
const { base64decode } = require('lib/base64')
```

## Modules structure


### Built in modules

| Module name   | Description   |
| ------------- | ------------- |
| `lib/base64`  | Base 64 encoding and decoding  |