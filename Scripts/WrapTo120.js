/**
  {
    "api":1,
    "name":"Wrap Text to 120",
    "description":"Wraps plain text to 120 characters or fewer. Leaves text not likely to be plain text.",
    "author":"alexc155",
    "icon":"term",
    "tags":"wrapping,line"
  }
**/

const { detectLineEnding, unwrap, wrap } = require('./WrapToLength');

function main(state) {
  const lineEnding = detectLineEnding(state.text);
  const unwrappedText = unwrap(state.text, lineEnding);
  const wrappedText = wrap(unwrappedText, 118, lineEnding);
  state.text = wrappedText;
}
