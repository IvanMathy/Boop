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

module.exports = {
  wrap,
  unwrap,
  detectLineEnding
}