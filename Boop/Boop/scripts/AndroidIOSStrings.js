/**
  {
    "api":1,
    "name":"Android Strings to iOS Localizables",
    "description":"Converts Android Strings to iOS localizables.",
    "author":"Manuel Kunz (https://github.com/KunzManuel)",
    "icon":"translation",
    "tags":"string,android,ios"
  }
**/

function main(input) {
    let lines = input.fullText.split('\n')
    var result = []
    lines.forEach(element => {
      var temp = element
      temp = temp.replace("<string name=", "")
      temp = temp.replace("</string>", "\";")
      temp = temp.replace(">", " = \"")
      result.push(temp)      
    })
  
    input.fullText = result.join('\n')
}
