/**
	{
		"api":1,
		"name":"EPOCMilliSecs to Date Time",
		"description":"Convert EPOC Millisecond to UTC/Local date time string",
		"author":"Sanal Kumar",
		"icon":"link",
		"tags":"date,time,calendar,unix,timestamp"
	}
**/

function main(input) {
	const isEpochMillisFormat = (str) => {
	  const regex = /^\d{13}$/;
	  return regex.test(str);
	};
	let parsedEpocMilliseconds = parseInt(input.text)
    if (!isEpochMillisFormat(input.text)) {
        input.postError("Invalid EPOC Millisecond Input")
    } else {
        input.text = new Date(parsedEpocMilliseconds).toUTCString() + "( Local Time : "+new Date(parsedEpocMilliseconds)+")"
    }
}

