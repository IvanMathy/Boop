/**
    {
        "api":1,
        "name":"Remove Duplicate Lines",
        "description":"Ensures each line of your text is unique",
        "author":"andipaetzold",
        "icon":"metamorphose",
        "tags":"unique,duplicate"
    }
**/

function main(input) {

    input.text = unique(input.text.split('\n')).join('\n')

}

function unique(array) {
	return [...new Set(array)]
}
