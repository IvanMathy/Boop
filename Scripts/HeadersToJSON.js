/**
    {
        "api":1,
        "name":"HTTP Headers to JSON",
        "description":"Converts color-separated HTTP headers to JSON format",
        "author":"rektdeckard",
        "icon":"identification",
        "tags":"json,js,http,https,headers,convert",
    }
**/

function main(state) {
  try {
    const data = state.text.trim();
    const lines = data.split(/[\r\n]+/).reduce((acc, line) => {
      const [key, value] = line.split(":").map((line) => line.trim());
      if (!value) return acc;
      return { ...acc, [key]: value };
    }, {});
    state.text = JSON.stringify(lines);
  } catch (ex) {
    state.postError(ex.message);
  }
}
