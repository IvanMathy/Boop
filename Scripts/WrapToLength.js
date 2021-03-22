function detectLineEnding(text) {
  const possibleLineEndings = ["\r\n", "\n", "\r"];
  for (const possibleLineEnding of possibleLineEndings) {
    if (text.trim().split(possibleLineEnding).length > 1) {
      return possibleLineEnding;
    }
  }
  return "\n";
}

function isCharInNormalWriting(char) {
  return char.match(/[\w,\.\&\!\?\(\):;'" ]/) !== null;
}

function unwrap(text, lineEnding) {
  let joinedLine = "";
  const unwrappedLines = [];
  let lineOrder = 0;
  const lines = text.split(lineEnding);
  for (const line of lines) {
    if (line.trim() === "") {
      if (joinedLine !== "") {
        unwrappedLines.push({ order: lineOrder, wrapLine: true, text: joinedLine });
        lineOrder++;
        joinedLine = "";
      }
      unwrappedLines.push({ order: lineOrder, wrapLine: false, text: lineEnding + lineEnding });
      lineOrder++;
    } else if (isCharInNormalWriting(getFirstChar(line)) && isCharInNormalWriting(getLastChar(line))) {
      joinedLine += line.trim() + " ";
    } else if (isCharInNormalWriting(getFirstChar(line))) {
      joinedLine += line.trim();
      unwrappedLines.push({ order: lineOrder, wrapLine: true, text: joinedLine });
      lineOrder++;
      joinedLine = "";
    } else {
      unwrappedLines.push({ order: lineOrder, wrapLine: true, text: joinedLine });
      lineOrder++;
      joinedLine = "";
      unwrappedLines.push({ order: lineOrder, wrapLine: false, text: line.trim() });
      lineOrder++;
    }
  }
  unwrappedLines.push({ order: lineOrder, wrapLine: true, text: joinedLine });
  return unwrappedLines;
}

function getLastChar(line) {
  return line.trim().split("").reverse().join("").substr(0, 1);
}

function getFirstChar(line) {
  return line.trim().substr(0, 1);
}

function wrap(text, numChars, lineEnding) {
  const lineEndFinder = new RegExp(`(?![^${lineEnding}]{1,${numChars}}$)([^${lineEnding}]{1,${numChars}})\\s`, "g");
  let ret = "";
  for (const line of text.sort((a, b) => a.order - b.order)) {
    if (!line.wrapLine) {
      ret += line.text;
    } else {
      ret += line.text.replace(lineEndFinder, `$1 ${lineEnding}`);
    }
  }
  return ret.trim();
}

function _testMain(state) {
  const lineEnding = detectLineEnding(state.text);
  const unwrappedText = unwrap(state.text, lineEnding);
  const wrappedText = wrap(unwrappedText, 78, lineEnding);
  state.text = wrappedText;
}

function _test() {
  const expected = {
    text: `Velit proident anim adipisicing veniam ex mollit labore proident ut nostrud 
sitamollit laborum aute elit aute do non adipisicing sunt nisi eu sit occaecat 
quisalaborum esse proident ex cupidatat qui velit nulla dolor anim 
exercitation Lorem id incididunt enim minim velit et velit elit et enim nisi 
dolore dolor irure ad non aliquip laboris proident officia proident aliqua 
pariatur sint sint proident consequat amet esse quis commodo eu mollit dolore 
exercitation nostrud minim enim esse labore dolore cillum proident laborum 
incididunt veniam ipsum eiusmod excepteur eu aliqua laboris esse minim 
consequat amet dolore ut et nostrud qui cillum.`,
  };

  const sut = {
    text: `Velit proident anim adipisicing veniam ex mollit labore proident ut nostrud sitamollit laborum aute elit aute do non adipisicing sunt nisi eu sit occaecat quisalaborum esse proident ex cupidatat qui velit nulla dolor anim exercitation Lorem id incididunt enim minim velit et velit elit et enim nisi dolore dolor irure ad non aliquip laboris proident officia proident aliqua pariatur sint sint proident consequat amet esse quis commodo eu mollit dolore exercitation nostrud minim enim esse labore dolore cillum proident laborum incididunt veniam ipsum eiusmod excepteur eu aliqua laboris esse minim consequat amet dolore ut et nostrud qui cillum.`,
  };

  _testMain(sut);

  if (sut.text === expected.text) {
    console.info("\x1b[32m✓\x1b[0m Reformatting simple text test pass");
  } else {
    console.error("\x1b[31m✗\x1b[0m Reformatting simple text test failed:\n");
    console.log(`\x1b[32mExpected\x1b[0m: \n${expected.text}\n`);
    console.log(`\x1b[31mActual\x1b[0m: \n${sut.text}\n`);
  }

  sut.text = `Velit proident anim adipisicing 
veniam ex mollit labore proident ut nostrud sitamollit laborum aute elit aute do non adipisicing sunt nisi eu sit occaecat quisalaborum esse proident ex cupidatat qui velit nulla dolor anim exercitation Lorem id incididunt enim minim velit et velit elit et enim nisi dolore dolor irure ad non aliquip laboris proident officia proident aliqua pariatur sint sint proident consequat 
amet esse quis commodo eu mollit dolore exercitation nostrud minim enim esse labore dolore cillum proident laborum incididunt veniam ipsum eiusmod excepteur eu aliqua laboris esse minim consequat amet dolore ut et nostrud qui cillum.`;

  _testMain(sut);

  if (sut.text === expected.text) {
    console.info("\x1b[32m✓\x1b[0m Reformatting badly wrapped text test pass");
  } else {
    console.error("\x1b[31m✗\x1b[0m Reformatting badly wrapped text test failed:\n");
    console.log(`\x1b[32mExpected\x1b[0m: \n${expected.text}\n`);
    console.log(`\x1b[31mActual\x1b[0m: \n${sut.text}\n`);
  }

  expected.text = `Velit proident anim adipisicing veniam ex mollit labore proident ut nostrud 
sitamollit laborum aute elit aute do non adipisicing sunt nisi eu sit occaecat 
quisalaborum esse proident ex. Cupidatat qui velit nulla dolor anim 
exercitation Lorem id incididunt enim minim velit et velit elit et enim nisi 
dolore dolor irure. 

Ad non aliquip laboris proident officia proident aliqua pariatur sint sint 
proident consequat amet. 

* exercitation dolor labore elit magna qui sint eiusmod mollit id nulla commodo sunt amet officia labore do anim eiusmod reprehenderit excepteur fugiat

Esse quis commodo eu mollit dolore exercitation nostrud minim enim esse labore 
dolore cillum proident laborum incididunt veniam ipsum eiusmod excepteur eu 
aliqua laboris: esse minim consequat amet dolore ut et nostrud qui cillum.`;

  sut.text = `Velit proident anim adipisicing veniam ex mollit labore proident ut nostrud sitamollit laborum aute elit aute do non adipisicing sunt nisi eu sit occaecat quisalaborum esse proident ex.
Cupidatat qui velit nulla dolor anim exercitation Lorem id incididunt enim minim velit et velit elit et enim nisi dolore dolor irure. 

Ad non aliquip laboris proident officia proident aliqua pariatur sint sint proident consequat amet. 

* exercitation dolor labore elit magna qui sint eiusmod mollit id nulla commodo sunt amet officia labore do anim eiusmod reprehenderit excepteur fugiat

Esse quis commodo eu mollit dolore exercitation nostrud minim enim esse labore dolore cillum proident laborum incididunt veniam ipsum eiusmod excepteur eu aliqua laboris: 
esse minim consequat amet dolore ut et nostrud qui cillum.`;

  _testMain(sut);

  if (sut.text === expected.text) {
    console.info("\x1b[32m✓\x1b[0m Reformatting badly wrapped & complex text test pass");
  } else {
    console.error("\x1b[31m✗\x1b[0m Reformatting badly wrapped & complex text test failed:\n");
    console.log(`\x1b[32mExpected\x1b[0m: \n${expected.text}\n`);
    console.log(`\x1b[31mActual\x1b[0m: \n${sut.text}\n`);
  }
}

_test();

module.exports = {
  wrap,
  unwrap,
  detectLineEnding
}