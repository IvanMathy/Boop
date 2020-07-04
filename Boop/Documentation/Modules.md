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
// or

const { base64encode } = require('lib/base64')
```

## Modules structure


### Built in modules

Boop ships with a couple of modules, with the prefix `@boop/`, which you can use in your own scripts.

| Module name        | Description   |
| ------------------ | ------------- |
| `@boop/base64`     | Base 64 encoding and decoding  |
| `@boop/lodash.boop`| Subset of lodash string functions (see below)|

#### Lodash

The built in lodash module was created with the following command and only includes a few functions and their direct dependencies:

```bash
$ lodash include=camelCase,deburr,escapeRegExp,kebabCase,snakeCase,startCase
```

If you'd like to add more functions, feel free to rebuild with additional parameters and submit a PR.