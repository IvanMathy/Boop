# Custom Scripts


## Setup

To use custom scripts, you need to tell Boop where to find them. Open the preferences Menu ( `Boop > Preferences...` or `⌘,` ) and go to the Scripts tab. You'll be able to set a custom path for Boop to look in.


## Writing Custom Scripts

You can easily extend Boop with custom scripts to add your own functionality. Each script is a self-contained Javascript file that is loaded at app launch. If you make something cool or useful, feel free to submit a PR and share it with everyone else!

### Meta info

Each script starts with a declarative JSON document, describing the contents of that file, a title, a description, which icon to use, and search tags. All that stuff is contained within a top level comment (with some extra asterisks) just like so:

```javascript
/**
  {
    "api":1,
    "name":"Add Slashes",
    "description":"Escapes your text",
    "author":"Ivan",
    "icon":"quote",
    "tags":"add,slashes,escape"
  }
**/
```

* `api` is not currently used, but is strongly recommended for potential backwards compatibility. You should set it to 1.
* `name`, `description` and `author` are exactly what you think they are.
* `icon` is a visual representation of your scripts' actions. You can see available icons in `Boop/Assets.xcassets/Icons/`. On macOS 11 and above you can also use [SF Symbols](https://developer.apple.com/sf-symbols/). If you can't find what you like, feel free to create an issue and we'll make it work!
* `tags` are used by the fuzzy-search algorythm to filter and sort results.

An optional property, `bias`, can also be added to help Boop prioritize your scripts. A positive value will move your script higher in the results, a negative value will push it further down. The bias property is a number:

```javascript
      "bias": -0.1
```



### The Main Function

Your script must declare a top level `main()` function, that takes in a single argument of type `ScriptExecution`. This is where all of the magic happens.

Your script will only be executed once, just like a web browser would at page load. Anytime your script's services are requested, `main()` will be invoked with a new execution object. 

Your script will be kept alive in its own virtual machine, retaining context and any potential global variables/functions you define. This means you need to be mindful of potentially generated garbage.

```js

function main(state) {
    // Do something useful here (or not)
}

```

### ScriptExecution

The script execution object is a representation of the current state of the editor. This is how you communicate with the main app. A new execution object will be created and passed down to your script every time the user needs it. Once your `main()` returns, values are extracted from the execution and put back in the editor.

Make sure you *do not store* the execution object. If you do so, the native ARC system will not release it, leading to memory leaks and a potential crash after 10-15 years of continuous use. All joking aside, this is not a good thing and if we can avoid we'll all be better off.

Script executions are not exactly full Javascript objects, instead they're a proxy to the native `ScriptExecution` Swift class that communicates with the editor. Properties are actually dynamic getters and setters rather than stored values, that way if the `fullText` is huge and you don't actually need it, we're not passing it around needlessly. Therefore, try to only use the values you need and store them in variables to avoid calling native code too often.

#### Properties

Script execution objects have three properties to deal with text: `text`, `fullText`, `selection`.

* `fullText` will contain or set the entire string from the Boop editor, regardless of whether a selection is made or not.
* `selection` will contain or set the currently selected text, one at a time if more that one selection exists (see below).
* `text`  will behave like `selection` if there is one or more selected piece of text, otherwise it will behave like `fullText`. 

```js

let selectedText = state.selection // get
state.fullText = "Replace the whole text" // set

state.text = "this could be a selection or a whole "

```

#### Functions

Script executions objects have a few functions that can be used to interact with the editor text, and present feedback to the user.

##### Editing

In version 1.2.O an above, the `insert()` function takes in a single string argument, and inserts it at the caret position. If there is a selected piece of text, it will be replaced with the provided string.

```js

state.insert("Hello, World!")

```

Multiple inserts are possible in a single script, they will be inserted sequentially in the order they were added.

```js

state.insert("1")
state.insert("2")
state.insert("3")

// => "123"

```


##### Messaging

Script execution objects have additional functions to communicate with the user, called `postInfo()` and `postError()`. These functions take in a single string argument, that will be presented in the Boop toolbar.

```js

state.postInfo(`${ lines.length } lines removed`)
state.postError("Invalid XML")

```


#### Multiselect

If the user selects more than one part of the text (by using `cmd` or `alt` while selecting), the script will be called multiple times as it uses either `selection` or `text`. If `fullText` is read or written to, the loop stops even if there is more unevaluated selections.


## Advanced features

#### Modules

Starting with version 1.2.0, modules can be imported in Boop scripts. See the [Modules page](Modules.md) for details.

#### Debugging

Starting with version 1.2.0, scripts can inspected and attached to by javascript console/debugger. See the [Debugging Scripts page](Debugging.md) for details.


## Limitations

### Sandbox

Boop scripts run in a sandboxed environment. This means the only way to get data in or out is through the script execution object. It is not currently possible to present UIs, or to affect how Boop behaves.

### JavascriptCore

JavascriptCore is the environment scripts run in. It is only a subset of Javascript running in a headless context, therefore a lot of what you would expect in a browser or Node.js isn't available. Things like `window`, `process`, `Crypto`, etc. do not exist and will throw errors if used. 

### Performance

A few times in this document you may have seen tips about performance, memory leaks, etc. Truth is, this is not that big of a deal because we're running minimal snippets of code in headless sandboxed environment. That being said, even though we're not at webpage-in-a-native-container levels of performance concerns, keeping the interface snappy and memory footprint low should be a priority when developing scripts so that we don't get a whole bunch of angry tweets about how maybe native apps aren't that great after all. (for the record they are that great).

Including all of jQuery to save a few lines of code may not be the greatest move here, so always prefer vanilla javascript functions as your whole script will be kept alive as long as the app is being used. If you'd like some helper functions, consider extracting only the part you need from the library (and clealy mention where it comes from alongside the license) rather than pasting the full source in your script. Includes/requires are not currently supported and not currently planned. Plus, if you use Vanilla you get to brag about how you can do it with nothing but your sharp brain and isn't that what being a developer is all about anyway?

### Removing limitations

If you find yourself hitting those limitations, feel free to file an issue your get in touch via Twitter. Boop and the scripting system can be extended to support more use cases, we just need to figure it out together!
