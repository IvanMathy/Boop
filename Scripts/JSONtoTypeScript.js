/**
	{
		"api":1,
		"name":"JSON to TypeScript",
		"description":"Generates TypeScript interfaces from a JSON document.",
		"author":"S4nshine",
		"icon":"metamorphose",
		"tags":"json,typescript,ts,type,types,interface,convert"
	}
**/

const ROOT_NAME = "Root";
const INDENT = "  ";
const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

let declarations = [];
let usedNames = Object.create(null);

function main(state) {

	const input = state.text;

	if (!input || input.trim().length === 0) {
		state.postError("Nothing to convert.");
		return;
	}

	let parsed;

	try {
		parsed = JSON.parse(input);
	} catch (error) {
		state.postError("Invalid JSON: " + error.message);
		return;
	}

	// The script's VM is kept alive between runs, so state has to be reset.
	declarations = [];
	usedNames = Object.create(null);

	const rootType = inferUnion([parsed], ROOT_NAME);

	const output = declarations.map(function (declaration) {
		return "interface " + declaration.name + " {\n" + declaration.body + "\n}";
	});

	// Arrays, primitives and unions can't be an interface, so they get an alias.
	if (declarations.length === 0 || rootType !== declarations[0].name) {
		output.unshift("type " + uniqueName(ROOT_NAME) + " = " + rootType + ";");
	}

	state.text = output.join("\n\n");

	const count = declarations.length;
	state.postInfo(count === 0 ? "Type alias generated"
		: count === 1 ? "1 interface generated"
		: count + " interfaces generated");
}

/**
 * Returns the type of every value a single key (or array slot) was seen holding.
 * Objects are merged into one interface rather than becoming a union, so that
 * an array of similar records produces a single, useful type.
 */
function inferUnion(values, suggestedName) {

	const objects = [];
	const arrays = [];
	const primitives = [];
	let nullable = false;

	values.forEach(function (value) {
		if (value === null) {
			nullable = true;
		} else if (Array.isArray(value)) {
			arrays.push(value);
		} else if (typeof value === "object") {
			objects.push(value);
		} else if (primitives.indexOf(typeof value) === -1) {
			primitives.push(typeof value);
		}
	});

	const parts = [];

	if (objects.length > 0) {
		parts.push(declareInterface(objects, suggestedName));
	}

	if (arrays.length > 0) {
		parts.push(inferArrayType(arrays, suggestedName));
	}

	primitives.forEach(function (primitive) {
		parts.push(primitive);
	});

	if (nullable) {
		parts.push("null");
	}

	if (parts.length === 0) {
		return "unknown";
	}

	return parts.join(" | ");
}

/**
 * Flattens every array seen for a key into a single element type, so that
 * [[1], [2, 3]] describes number[][] rather than two competing shapes.
 */
function inferArrayType(arrays, suggestedName) {

	const elements = [];

	arrays.forEach(function (array) {
		array.forEach(function (element) {
			elements.push(element);
		});
	});

	if (elements.length === 0) {
		return "unknown[]";
	}

	const elementType = inferUnion(elements, singularize(suggestedName));

	return elementType.indexOf(" | ") === -1 ? elementType + "[]" : "(" + elementType + ")[]";
}

/**
 * Builds one interface out of every object sample seen in the same position.
 * A key missing from any of the samples is marked optional.
 */
function declareInterface(samples, suggestedName) {

	const keys = [];
	const seen = Object.create(null);

	samples.forEach(function (sample) {
		Object.keys(sample).forEach(function (key) {
			if (!seen[key]) {
				seen[key] = true;
				keys.push(key);
			}
		});
	});

	if (keys.length === 0) {
		return "Record<string, unknown>";
	}

	// The slot is claimed before recursing so that parents are declared
	// above their children in the output.
	const slot = declarations.length;
	declarations.push(null);
	const name = uniqueName(suggestedName);

	const body = keys.map(function (key) {

		const present = samples.filter(function (sample) {
			return Object.prototype.hasOwnProperty.call(sample, key);
		});

		const optional = present.length < samples.length;

		const type = inferUnion(present.map(function (sample) {
			return sample[key];
		}), pascalCase(key));

		return INDENT + formatKey(key) + (optional ? "?" : "") + ": " + type + ";";

	}).join("\n");

	declarations[slot] = { name: name, body: body };

	return name;
}

function formatKey(key) {
	return IDENTIFIER.test(key) ? key : JSON.stringify(key);
}

function pascalCase(text) {

	const name = String(text)
		.split(/[^A-Za-z0-9]+/)
		.filter(function (word) { return word.length > 0; })
		.map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); })
		.join("");

	if (name.length === 0) {
		return "Value";
	}

	return /^[0-9]/.test(name) ? "_" + name : name;
}

function singularize(name) {

	if (/ies$/.test(name)) {
		return name.replace(/ies$/, "y");
	}

	if (/(ch|sh|ss|x|z)es$/.test(name)) {
		return name.replace(/es$/, "");
	}

	// "Status", "Address" and "Analysis" are singular already.
	if (/(us|ss|is)$/.test(name)) {
		return name + "Item";
	}

	if (/s$/.test(name)) {
		return name.replace(/s$/, "");
	}

	return name + "Item";
}

function uniqueName(base) {

	let name = base;
	let counter = 2;

	while (usedNames[name]) {
		name = base + counter;
		counter++;
	}

	usedNames[name] = true;

	return name;
}
