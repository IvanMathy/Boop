const defaultFont = require('./asciiart-font.js');
const fonts = {
  default: defaultFont
}

// Construct a phrase with a given language
module.exports = function(string, options) {
  options = Object.assign({
    font: 'default',
    lineBreak: '\n'
  }, options);
  // Set spacer to font's default
  if (!options['spacer']) {
    options['spacer'] = fonts[options['font']].settings.spacer;
  }

  // Check if language is valid
  valid(fonts[options['font']]);

  let output;
  let result = "";

  if (typeof(string) !== 'string' || string === null || string === "") return;

  string.split(options['lineBreak']).forEach(function(fragment) {
    // Append the same amount of arrays as the font height
    output = [];
    for (let i = 0; i < fonts[options['font']].settings.height; i++, output.push([""]));

    for (i = 0, letter = fragment[i]; i < fragment.length; i++, letter = fragment[i]) {
      letter = translate(letter, fonts[options['font']]);
      for (let j = 0, line = fonts[options['font']][letter][j]; j < fonts[options['font']][letter].length; j++, line = fonts[options['font']][letter][j]) {
        output[j] += line;
      }
      // Adds spacers between letters where not the last letter
      if (i + 1 !== fragment.length)
        output = appendSpacer(output, options['spacer']);
    }
    result = append(result, output);
  })

  return result;
}

// Check if a font is valid
function valid(font) {
  // Each font needs a height, a spacer, a space field, and a dne field
  if (!font.settings) {
    throw new TypeError('Font Error: Missing settings object');
  } else if (!font.settings.height) {
    throw new TypeError('Font Error: Missing letter height');
  } else if (!font.settings.spacer && font.settings.spacer !== "") {
    throw new TypeError('Font Error: Missing letter spacer');
  } else if (!font['space']) {
    throw new TypeError('Font Error: Missing `space` field');
  } else if (!font['dne']) {
    throw new TypeError('Font Error: Missing `dne` field');
  }

  // Check that every letter has the same height and is an array
  if (font.settings.height === 0) {
    return true;
  } else {
    let letterHeight = font.settings.height;
    for (line in font) {
      if (line === 'settings');
      else {
        if (font[line].length !== letterHeight) {
          throw new TypeError('Font Error: Letters don\'t have the same listed height');
        }
        if (!Array.isArray(font[line])) {
          throw new TypeError('Font Error: Expected letter of type `array` but got `' + typeof(line) + '`');
        }
      }
    }
  }

  return true;
}

// Append current letters to a single line
function append(result, arr) {
  for (let i = 0, line = arr[i]; i < arr.length; i++, line = arr[i]) {
    result += line + '\n';
  }
  return result;
}

// Append a spacer to the current letters
function appendSpacer(output, spacer) {
  for (let i = 0, line = spacer[i]; i < spacer.length; i++, line = spacer[i]) {
    output[i] += line;
  }
  return output;
}

// Translate letters to specific indices
function translate(letter, font) {
  // Catch alphabetic
  if (letter.match(/^[a-zA-Z]/g)) {
    // Only allow lowercase letters (might change with new fonts)
    return letter.toLowerCase();
  }
  let name;
  // Find names for non-alphabetic and append symbols as necessay
  switch(letter) {
    case ' ':
      name = 'space';
      break;
    case ',':
      name = 'comma';
      break;
    case '\'':
      name = 'apostrophe';
      break;
    case '.':
      name = 'period';
      break;
    case '!':
      name = 'exclamation';
      break;
    case '?':
      name = 'question';
      break;
    case '-':
      name = 'dash';
      break;
    default:
      name = 'dne';
  }

  // Make sure it exists in the font
  if (!font[name]) {
    return 'dne';
  } else {
    return name;
  }
}
