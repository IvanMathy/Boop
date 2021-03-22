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

function _test() {
  const expected = {
    text: `Velit proident anim adipisicing veniam ex mollit labore proident ut nostrud sitamollit laborum aute elit aute do non 
adipisicing sunt nisi eu sit occaecat quisalaborum esse proident ex cupidatat qui velit nulla dolor anim exercitation 
Lorem id incididunt enim minim velit et velit elit et enim nisi dolore dolor irure ad non aliquip laboris proident 
officia proident aliqua pariatur sint sint proident consequat amet esse quis commodo eu mollit dolore exercitation 
nostrud minim enim esse labore dolore cillum proident laborum incididunt veniam ipsum eiusmod excepteur eu aliqua 
laboris esse minim consequat amet dolore ut et nostrud qui cillum.`,
  };

  const sut = {
    text: `Velit proident anim adipisicing veniam ex mollit labore proident ut nostrud sitamollit laborum aute elit aute do non adipisicing sunt nisi eu sit occaecat quisalaborum esse proident ex cupidatat qui velit nulla dolor anim exercitation Lorem id incididunt enim minim velit et velit elit et enim nisi dolore dolor irure ad non aliquip laboris proident officia proident aliqua pariatur sint sint proident consequat amet esse quis commodo eu mollit dolore exercitation nostrud minim enim esse labore dolore cillum proident laborum incididunt veniam ipsum eiusmod excepteur eu aliqua laboris esse minim consequat amet dolore ut et nostrud qui cillum.`,
  };

  main(sut);

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

  main(sut);

  if (sut.text === expected.text) {
    console.info("\x1b[32m✓\x1b[0m Reformatting badly wrapped text test pass");
  } else {
    console.error("\x1b[31m✗\x1b[0m Reformatting badly wrapped text test failed:\n");
    console.log(`\x1b[32mExpected\x1b[0m: \n${expected.text}\n`);
    console.log(`\x1b[31mActual\x1b[0m: \n${sut.text}\n`);
  }

  expected.text = `Velit proident anim adipisicing veniam ex mollit labore proident ut nostrud sitamollit laborum aute elit aute do non 
adipisicing sunt nisi eu sit occaecat quisalaborum esse proident ex. Cupidatat qui velit nulla dolor anim exercitation 
Lorem id incididunt enim minim velit et velit elit et enim nisi dolore dolor irure. 

Ad non aliquip laboris proident officia proident aliqua pariatur sint sint proident consequat amet. 

* exercitation dolor labore elit magna qui sint eiusmod mollit id nulla commodo sunt amet officia labore do anim eiusmod reprehenderit excepteur fugiat

Esse quis commodo eu mollit dolore exercitation nostrud minim enim esse labore dolore cillum proident laborum 
incididunt veniam ipsum eiusmod excepteur eu aliqua laboris: esse minim consequat amet dolore ut et nostrud qui 
cillum.`;

  sut.text = `Velit proident anim adipisicing veniam ex mollit labore proident ut nostrud sitamollit laborum aute elit aute do non adipisicing sunt nisi eu sit occaecat quisalaborum esse proident ex.
Cupidatat qui velit nulla dolor anim exercitation Lorem id incididunt enim minim velit et velit elit et enim nisi dolore dolor irure. 

Ad non aliquip laboris proident officia proident aliqua pariatur sint sint proident consequat amet. 

* exercitation dolor labore elit magna qui sint eiusmod mollit id nulla commodo sunt amet officia labore do anim eiusmod reprehenderit excepteur fugiat

Esse quis commodo eu mollit dolore exercitation nostrud minim enim esse labore dolore cillum proident laborum incididunt veniam ipsum eiusmod excepteur eu aliqua laboris: 
esse minim consequat amet dolore ut et nostrud qui cillum.`;

  main(sut);

  if (sut.text === expected.text) {
    console.info("\x1b[32m✓\x1b[0m Reformatting badly wrapped & complex text test pass");
  } else {
    console.error("\x1b[31m✗\x1b[0m Reformatting badly wrapped & complex text test failed:\n");
    console.log(`\x1b[32mExpected\x1b[0m: \n${expected.text}\n`);
    console.log(`\x1b[31mActual\x1b[0m: \n${sut.text}\n`);
  }
}

_test();
