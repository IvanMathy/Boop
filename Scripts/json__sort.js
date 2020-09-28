/**
  {
    "api":1,
    "name":"Sort JSON",
    "description":"Sort JSON",
    "author":"MaDnh",
    "icon":"sort-characters",
    "tags":"json,sort"
  }
**/

function main(state) {
  let value = state.text;

  try {
    value = JSON.parse(value);
  } catch (e) {
    state.postError("Invalid JSON");
    return;
  }

  value = sort(value);

  state.text = JSON.stringify(value, null, 2);
  state.postInfo(`Sorted`);
}


function sort(obj) {
  if (obj instanceof Array) {
    return obj.map(item => sort(item));
  }

  if (!isPlainObject(obj)) {
    return obj
  }

  const result = {};
  const keys = Object.keys(obj);

  keys.sort();
  keys.forEach(key => {
    result[key] = sort(obj[key])
  });

  return result;
}

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}