/**
  {
    "api":1,
    "name":"Count Words",
    "description":"Get the word count of your text.",
    "author":"Daniel Stone",
    "icon":"counter",
    "tags":"count,length,size,words"
  }
**/
function main(input) {
    input.postInfo(`${input.text.trim().match(/[A-z&0-9]\S*/g).length} words`)
}