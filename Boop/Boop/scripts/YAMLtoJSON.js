/**
	{
		"api":1,
		"name":"YAML to JSON",
		"description":"Converts YAML to JSON.",
		"author":"Ivan",
		"icon":"metamorphose",
		"tags":"markup,convert"
	}
**/

const yaml = require('@boop/js-yaml')

function main(input) {

	try {
        input.text = JSON.stringify(yaml.safeLoad(input.text), null, 2)
	}
	catch(error) {
		input.postError("Invalid YAML")
	}
	
}