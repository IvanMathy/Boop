/**
    {
        "api":1,
        "name":"Remove Duplicate Lines",
        "description":"Only keeps unique lines.",
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
