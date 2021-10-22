const convertMonthToString = (monthNumber) => {
	const monthStrings = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return monthStrings[monthNumber - 1];
};

export default convertMonthToString;
