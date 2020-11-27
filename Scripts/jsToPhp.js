/**
	{
		"api":1,
		"name":"JS To PHP",
		"description":"Convert JS Object or Array to PHP.",
		"author":"jtolj",
		"icon":"elephant",
		"tags":"js,php,convert"
	}
**/

function main(state) {
  try {
    const result = new Function(`return ${state.text}`)();
    state.text = convert(result) + ';';
  } catch (error) {
    state.postError(error.message);
  }
}

const toPHP = function (value, indentation) {
  switch (typeof value) {
    case 'object':
      value = convert(value, indentation + 1);
      break;
    case 'string':
      value = value.replace(/"/g, '\\"');
      value = `"${value}"`;
      break;
  }

  return value;
};

const convert = function (result, indentation = 1) {
  const isArray = Array.isArray(result);
  let str = Object.keys(result).reduce((acc, key) => {
    const value = toPHP(result[key], indentation);
    acc += ' '.repeat(indentation * 4);
    acc += isArray ? value : `'${key}' => ${value}`;
    acc += ',\n';
    return acc;
  }, '');
  const endingIndentation = ' '.repeat((indentation - 1) * 4);
  return `[\n${str}${endingIndentation}]`;
};
