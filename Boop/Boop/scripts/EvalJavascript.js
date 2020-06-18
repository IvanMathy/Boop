/**
     {
         "api":1,
         "name":"Eval",
         "description":"Evaluate Javascript.",
         "author":"Sebastiaan Besselsen",
         "icon":"unknown",
         "tags":"js,script,run"
     }
 **/

function main(input) {
    const script = input.text.replace(/\n\n\/\/ Result:[\s\S]*$/, '');

    let output = '';
    try {
        output = eval(script);
        if (typeof output !== 'string') {
            output = JSON.stringify(output, null, 2);
        }
    } catch (e) {
        input.postError(e.toString());
    }

    input.text = script + "\n\n// Result:\n\n" + output;
}
