# Debugging Scripts


___
**<p align=center>Debugging is only available in dev builds, in Boop version 1.2.0 and above.</p>**
___

## Getting a dev build

To use debugging tools, you need a dev build of Boop. This is a restriction of JavascriptCore (the thing that runs scripts) that I have not yet found a way to avoid.

Since dev builds cannot be signed, they cannot be distributed and you need to make your own. For this, you'll need Xcode (free on the Mac App Store or the [Apple Developer Website](https://developer.apple.com)). Once you have it, follow these steps:

- Download the Boop source code from Github or clone it locally using git. You can find a compressed version of the source code on the [releases page](https://github.com/IvanMathy/Boop/releases/).

- In the source code, find and open `Boop.xcodeproj` with Xcode (it's in the `Boop` folder, surprisingly).

- On the top left corner of the Xcode window, hit the play button. The dev build should start.

## Preparing the debugger

To see your script in the debugger, you'll need to run that script at least once. It does not matter if it doesn't work, Boop just needs to know you want to use it.

After running your script, open Safari (the web browser that comes bundled on macOS). If you've never used the developer tools, open Safari's preferences, go to the `Advanced` tab and enable `Show Develop menu in menu bar`.


<p align="center">
  <img src="Images/safari.png?raw=true" width="663" alt="UI Screenshot">
</p>



## Connecting the debugger

Once set up, you should be able to see your script in the `Develop` menu, in the submenu with the same name as your computer (in the screenshot, it's `Ivan MKII` - yours will be different, most likely), under the `Boop Section`. Select the script you'd like to debug. 

<p align="center">
  <img src="Images/developMenu.png?raw=true" width="663" alt="UI Screenshot">
</p>

If you see `No Inspectable Applications`, please double check that:

- Boop is running
- It is a dev build
- You used your script at least once

## Using the debugger

The debugger is the same as the built-in one from Safari, and works just like any in-browser inspector. The central panel shows the source of your script. *Editing it there will not affect the script within Boop, and any change will be lost.*

<p align="center">
  <img src="Images/debugger.png?raw=true" width="663" alt="UI Screenshot">
</p>


## Modules

Modules are show as separate files in the left panel of the debugger. You'll notice that the module's source will have some added code above and below, surrounded with tags like this:

```javascript
/***********************************
*     Start of Boop's wrapper      *
***********************************/
```

This is how Boop makes sure modules are safe and compatible. The wrapper is added at runtime. It ain't pretty but it gets the job done.

<p align="center">
  <img src="Images/modules.png?raw=true" width="663" alt="UI Screenshot">
</p>


## Console

When the debugger is active, the `console` object gets enabled. You can use the bottom panel or the `Console` tab to read the output and use the interactive prompt.

<p align="center">
  <img src="Images/console.png?raw=true" width="663" alt="UI Screenshot">
</p>

Anything posted to the console prior to opening the debugger is recorded and will be displayed when you open it. Therefore, you don't need to rush to open the debugger to see initialization messages for example.

Please note that `console` is not available in non-debug builds, and using it will cause your script to throw an exception.

## Breakpoints

You can use breakpoints in the debugger, just like you would in any programming environment. The best way to do that is to place it in somewhere called by the `main()` function.

<p align="center">
  <img src="Images/breakpoints.png?raw=true" width="663" alt="UI Screenshot">
</p>

When a breakpoint is active, you can see the scope in the right panel, step over/into in the left panel, or interact with the console in the bottom panel.

While the breakpoint is active, Boop will become unresponsive. To make Boop usable again, continue the script execution by pressing the play button at the top left of the debugger.

## Reloading scripts

When reloading scripts within Boop, the debugger **will not** automatically reload. If you want to check a new version of your script, close the debugger, run the scripts again for it to register, then re-open the debugger.

Leaving the debugger open will not release the previous version of the script, and therefore duplicates will show in the debugging menu.

When reopening previously opened scripts (even from a previous development session), the debugger will remember any previously applied breakpoint. Keep that in mind when debugging a module, as it's easy to forget you had a breakpoint in there.


## Final wisdom

Just like any software development environment, there is inherent danger in using those tools if you don't know what you're doing. Use at your own risk, avoid clicking stuff you don't know, and be nice to people.
