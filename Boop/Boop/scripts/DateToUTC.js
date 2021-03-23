/**
	{
		"api":1,
		"name":"Date to UTC",
		"description":"Converts dates and timestamps to UTC dates",
		"author":"Ivan",
		"icon":"watch",
		"tags":"date,time,calendar,unix,timestamp"
	}
**/

function main(input) {

  let string = input.text

  let parsedDate = Date.parse(string)

  if (isNaN(parsedDate)) {
    if (!isNaN(string)) {
      if (string.length > 10) {
        // Probably has milliseconds
        parsedDate = new Date(parseInt(string));
      } else {
        parsedDate = new Date(parseInt(string) * 1000);
      }
    } else {
      parsedDate = new Date(parseInt(string) * 1000);
    }
  } else {
    parsedDate = new Date(parsedDate)
  }

  let out = parsedDate.toUTCString()

  if (out === "Invalid Date") {
    input.postError(out)
    return
  }

  input.text = out
}

function _test() {
  const expected = {
    text: "Tue, 23 Mar 2021 15:38:52 GMT",
  };

  const sut = {
    text: "1616513932426",
  };

  main(sut);

  if (sut.text === expected.text) {
    console.info("\x1b[32m✓\x1b[0m Convert with milliseconds test pass");
  } else {
    console.error("\x1b[31m✗\x1b[0m Convert with milliseconds test failed:\n");
    console.log(`\x1b[32mExpected\x1b[0m: \n${expected.text}\n`);
    console.log(`\x1b[31mActual\x1b[0m: \n${sut.text}\n`);
  }

  sut.text = "1616513932";
  main(sut);

  if (sut.text === expected.text) {
    console.info("\x1b[32m✓\x1b[0m Convert without milliseconds test pass");
  } else {
    console.error("\x1b[31m✗\x1b[0m Convert without milliseconds test failed:\n");
    console.log(`\x1b[32mExpected\x1b[0m: \n${expected.text}\n`);
    console.log(`\x1b[31mActual\x1b[0m: \n${sut.text}\n`);
  }

  sut.text = "23 Mar 2021 15:38:52";
  main(sut);

  if (sut.text === expected.text) {
    console.info("\x1b[32m✓\x1b[0m Convert date string test pass");
  } else {
    console.error("\x1b[31m✗\x1b[0m Convert date string test failed:\n");
    console.log(`\x1b[32mExpected\x1b[0m: \n${expected.text}\n`);
    console.log(`\x1b[31mActual\x1b[0m: \n${sut.text}\n`);
  }
}

_test();
