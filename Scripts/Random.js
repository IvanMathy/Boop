/**
  {
    "api":1,
    "name":"Random Number Generator",
    "description":"Generate random number between 0-1_000_000",
    "author":"Samir Dadash-zada",
    "icon":"function",
    "tags":"random,number"
  }
**/

function main(state)
{
    let min = 0;
    let max = 1000000;
    const input = state.fullText;

    if(input)
    {
        const rangeArr = input.split('-');
        min = +rangeArr[0];
        max = +rangeArr[1];

        if(isNaN(min))
            min = 0;
        if(isNaN(max))
            max = 1000000;
    }

    state.fullText = randomGenerate(min, max);
    state.postInfo(`Generated random number between ${min}-${max}`)
}

function randomGenerate(min, max)
{
    return Math.round((Math.random() * (max - min)) + min, 0)
}