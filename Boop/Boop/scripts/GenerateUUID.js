/**
{
"api":1,
"name":"Generate UUID",
"description":"Generate UUID as v4",
"author":"ImanX",
"icon":"quote",
"tags":"uuid,generate"
}
 **/

function main(input) {
    input.text = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });

}