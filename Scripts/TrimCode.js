/**
{
  "api": 1,
  "name": "Trim Code",
  "description": "Removes extra indentation but keeps original code structure.",
  "author": "Josh Angelsberg",
  "icon": "scissors",
  "tags": "trim,indent,whitespace,code"
}
**/

function main(input) {
  // split into lines
  const lines = input.text.split('\n');
  if (!lines.length) return;

  // trim leading whitespace on the first line
  const firstLine = lines[0];
  const trimmedFirst = firstLine.trimStart();
  const indentCount = firstLine.length - trimmedFirst.length;

  // apply the same slice to every line
  const result = lines.map((line, idx) =>
    idx === 0
      ? trimmedFirst
      : line.slice(indentCount)
  );

  // rejoin and update
  input.text = result.join('\n');
}
