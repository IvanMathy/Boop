/**
     {
         "api":1,
         "name":"Sort lines",
         "description":"Sort lines alphabetically.",
         "author":"Sebastiaan Besselsen",
         "icon":"sort-characters",
         "tags":"sort,alphabet"
     }
 **/

function main(input) {
    let sorted = input.text.replace(/\n$/, '').split('\n')
        .sort((a, b) => {
            a = a.replace(/^\s+/, '');
            b = b.replace(/^\s+/, '');
            return a.localeCompare(b);
        })
        .join('\n');

    if (sorted === input.text) {
        sorted = sorted.split('\n').reverse().join('\n');
    }
    input.text = sorted;
}
