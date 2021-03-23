/**
    {
        "api":1,
        "name":"Markdown Table",
        "description":"Converts text to a github markdown table",
        "author":"alexc155",
        "icon":"table",
        "tags":"github,markdown,table",
        "bias": -0.1
    }
**/

function main(state) {
  var rows = parseInput(state.text);
  var separator = getSeparator(rows);

  var colLengths = getColumnLengths(rows, separator);

  var output = "\n";

  for (var i = 0; i < rows.length; i++) {
    if (i === 1) {
      output += getSeparatorRow(colLengths);
    }

    var cols;
    var data;

    for (var j = 0; j <= colLengths.length; j++) {
      cols = rows[i].split(separator);
      data = cols[j] || "";
      if (j < colLengths.length) {
        data = pad(data, colLengths[j]);
        output += "| " + data + " ";
      } else {
        output += "|\n";
      }
    }
  }

  state.text = output;
}

function getColumnLengths(rows, separator) {
  var isNumberCol = [];
  var colLengths = [];
  for (var i = 0; i < rows.length; i++) {
    rows[i] = rows[i].replace(/(    )/g, separator);
    var cols = rows[i].split(separator);
    for (var j = 0; j < cols.length; j++) {
      var data = cols[j];
      var isNewCol = colLengths[j] == undefined;
      if (isNewCol) {
        isNumberCol[j] = true;
      }
      if (isNumberCol[j] && !data.match(/^(\s*-?(\d|,| |[.])*\s*)$/)) {
        isNumberCol[j] = false;
      }
      if (isNewCol || colLengths[j] < data.length) {
        colLengths[j] = data.length;
      }
    }
  }
  return colLengths;
}

function parseInput(txt) {
  var rows = txt.split(/[\r\n]+/);
  var input = "";
  for (const row of rows) {
    if (row.length === 0) {
      continue;
    } else if (row.substr(0, 1) === "|") {
      if (row.substr(1, 1) !== "-") {
        input += convertToPlainText(row) + "\n";
      }
    } else {
      input = txt.replace(/  /g, "\t");
      break;
    }
  }

  while (input.includes("\t\t")) {
    input = input.replace("\t\t", "\t");
  }

  rows = input.split(/[\r\n]+/);
  while (rows[rows.length - 1] === "") {
    rows.pop();
  }
  return rows;
}

function getSeparator(rows) {
  var separator = "\t";
  var possibleSeparators = ["\t", "|", ",", " "];
  for (const possibleSeparator of possibleSeparators) {
    if (rows[0].split(possibleSeparator).length > 1) {
      return possibleSeparator;
    }
  }
  return separator;
}

function getSeparatorRow(lengths) {
  var rowOutput = "";
  for (var j = 0; j <= lengths.length; j++) {
    if (j < lengths.length) {
      rowOutput += "|" + repeat("-", lengths[j] + 2);
    } else {
      rowOutput += "|\n";
    }
  }
  return rowOutput;
}

function pad(text, length) {
  var additionalChars = length - text.length;
  return text + repeat(" ", additionalChars);
}

function repeat(str, num) {
  return new Array(num + 1).join(str);
}

function convertToPlainText(line) {
  var ret = line.substr(2, line.length - 4);
  ret = ret.replace(/ \| /g, "\t");
  while (ret.includes(" \t")) {
    ret = ret.replace(" \t", "\t");
  }
  while (ret.includes("\t\t")) {
    ret = ret.replace("\t\t", "\t");
  }
  return ret.trim();
}

function _test() {
  var expected = {
    text: `
| Col1                             | Col2    | Col3                   | Numeric Column |
|----------------------------------|---------|------------------------|----------------|
| Value 1                          | Value 2 | 123                    | 10.0           |
| Separate                         | cols    | with a tab or 4 spaces | -2,027.1       |
| This is a row with only one cell |         |                        |                |
`,
  };

  var sut = {
    text: `
| Col1 | Col2 | Col3 | Numeric Column |
|------|------|------|----------------|
| Value 1 | Value 2 | 123 | 10.0 |
| Separate | cols | with a tab or 4 spaces | -2,027.1 |
| This is a row with only one cell |  |  |  |
`,
  };

  main(sut);

  if (sut.text === expected.text) {
    console.info("\x1b[32m✓\x1b[0m Reformatting existing table test pass");
  } else {
    console.error("\x1b[31m✗\x1b[0m Reformatting existing table test failed:");
    console.log(`Expected: ${expected.text}`);
    console.log(`Actual: ${sut.text}`);
  }

  sut = {
    text: `Col1	Col2	Col3	Numeric Column
Value 1	Value 2	123	10.0
Separate	cols    with a tab or 4 spaces	-2,027.1
This is a row with only one cell`,
  };

  main(sut);

  if (sut.text === expected.text) {
    console.info("\x1b[32m✓\x1b[0m Formatting new table test pass");
  } else {
    console.error("\x1b[31m✗\x1b[0m Formatting new table test failed:");
    console.log(`Expected: ${expected.text}`);
    console.log(`Actual: ${sut.text}`);
  }
}

_test();
