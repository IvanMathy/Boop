/**
  {
    "api":1,
    "name":"Unescape JSON String",
    "description":"Removes escape characters from JSON string",
    "author":"tahsinature",
    "icon":"table",
    "tags":"json,unescape,escape"
  }
**/

const unescapeJSONString = (str = "") => {
  return str
    .replace(/(\\n)/g, "")
    .replace(/(\\r)/g, "")
    .replace(/(\\t)/g, "")
    .replace(/(\\f)/g, "")
    .replace(/(\\b)/g, "")
    .replace(/(\")/g, '"')
    .replace(/("{)/g, "{")
    .replace(/(}")/g, "}")
    .replace(/(\\)/g, "")
    .replace(/(\/)/g, "/");
};

function main(state) {
  let input = state.fullText;
  try {
    try {
      JSON.parse(input);
    } catch (error) {
      if (!input.startsWith('"')) input = `"${input}`;
      if (!input.endsWith('"')) input = `${input}"`;
      JSON.parse(input);
    }

    state.fullText = unescapeJSONString(input);
    state.postInfo("JSON is unescapped!");
  } catch (error) {
    let msg = "Something went wrong!";

    if (error instanceof SyntaxError) msg = "Invalid JSON";
    else msg = `${error.name}-${error.message}`;

    state.postError(msg);
  }
}
