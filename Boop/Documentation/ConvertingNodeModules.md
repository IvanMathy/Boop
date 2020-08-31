# Converting Node Modules

For more complex scripts it can be nice to leverage packages from NPM.
However, most modules are not compatible with Boop. Luckily any script
that can be in a browser can work with Boop!

## Crafting Your Script

First write your script like any normal Boop Script
 except declare your main in the `global` namespace and dont add
 the declarative json document yet.

```
const curlconverter = require('curlconverter');

global.main = function(state) {
    try {
        state.text = curlconverter.toPython(state.text);
    } catch (error) {
        state.postError("Failed to Convert");
    }
}
```

Then use [Browserify](http://browserify.org/) to bundle 
the script.

`browserify curlToPython_orig.js -o curlToPythonBundle.js`

Boop is not a browser. That means you need to add a window var. Just add this line
to the top of the script.
```
const window = this;
```
 
Finally, add the declarative JSON document
(as described in [Custom Scripts](CustomScripts.md)) to the top, and you are done!

