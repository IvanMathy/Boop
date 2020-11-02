
/**
  {
    "api":1,
    "name":"Password Strength",
    "description":"Check the complexity of your password",
    "author":"luisfontes19?",
    "icon":"broom",
    "tags":"password,security,Strength"
    
  }
**/

const zxcvbn = require("./lib/zxcvbn.js");

function main(state) {

  const result = zxcvbn(state.text);
  const output =
    `\n\n` +
    `Score (from 1-5): ${result.score + 1}\n` +
    `Feedback: ${result.feedback.warning}\n` +
    `Suggestion: ${result.feedback.suggestions}\n` +
    `Estimated guesses to crack: ${result.guesses}\n` +
    `Estimated time to crack the password on a single machine can be about ` +
    `${result.crack_times_display.offline_fast_hashing_1e10_per_second} to ${result.crack_times_display.offline_slow_hashing_1e4_per_second}\n`



  state.text += output;

}

