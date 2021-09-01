/**
	{
		"api":1,
		"name":"Sum All",
		"description":"Sum a list of numbers (separated by either a new line, comma, or semicolon).",
		"author":"Annie Tran",
		"icon":"abacus",
		"tags":"sum,calculator,addition,add"
	}
**/

function main(input) {
  const s = input.text
  if (s && s.trim().length > 0) {
    input.text = [formatNumberString(s), calculate(s)].join('\n')
  }
}

function formatNumberString(str) {
  return str.replace(/\s?\/\/.*$/g, '').split('\n').filter(e => !/^\/\/.*/.test(e))
    .join('\n')
}

function calculate(numbers) {
  const lines = numbers
    .replace(/,/g, '')
    .replace(/\s?\/\/.*$/g, '')
    .split('\n')
    .map(e => e.replace(/([0-9.-]+)k/g, (a, b) => Number(b) * 1000))
    .filter(e => !isNaN(Number(e)))
  const total = lines.filter(Boolean).reduce((a, b) => Number(a) + Number(b))
  return ['// => ' + lines.filter(e => e.trim()).join('+'), `// => ${total}`].join('\n')
}
