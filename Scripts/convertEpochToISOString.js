/**
  {
    "api":1,
    "name":"Convert Epoch to ISO Date",
    "description":"Convert Epoch Time to ISOString",
    "author":"mehulbaid",
    "icon":"clock",
    "tags":"convert,time,timezone,isoString,epoch"
  }
**/
function main (state) {
    state.text = epochToIsoString(state.text);
}

function epochToIsoString(epochString) {
    var epoch = parseInt(epochString);
    var date = new Date(epoch);
    return date.toISOString();
}
