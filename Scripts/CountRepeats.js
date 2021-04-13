/**
    {
        "api":1,
        "name":"Count Repeats",
        "description":"Finds the number of times an item appears in list",
        "author":"Srikanth Yashaswi",
        "icon":"filtration",
        "tags":"unique,duplicate"
    }
**/

function main(input) {
    let lines = input.text.split('\n')
    
    let out = count(lines);

    input.text = out.join('\n');
    
    input.postInfo(`found ${out.length} unique keys`);
}

function count(lines){
    let keyCount = {};

    for(var i = 0 ; i < lines.length;  i++){
        
        const key = lines[i].trim();

        if(key !== ''){
            const found = keyCount[key];
            keyCount[key] = !found ? 1 : found + 1;
        }
    }

    return ['key,count', ...Object.keys(keyCount).map(key => `${key},${keyCount[key]}`)];
}