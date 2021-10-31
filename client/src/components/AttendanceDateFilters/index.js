import "./AttendanceDateFilters.css";

import generateOptions from "../../utils/generateOptions";

const AttendanceDateFilters = ({ month, setMonth, year, setYear }) => {
	const months = [
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
	const years = [2020, 2021];

	const applyMonthFilter = (event) => {
		setMonth(event.target.value);
	};

	const applyYearFilter = (event) => {
		setYear(event.target.value);
	};

	return (
		<div className="filters-container">
			<select value={month} onBlur={applyMonthFilter}>
				{generateOptions(months)}
			</select>
			<select value={year} onBlur={applyYearFilter}>
				{generateOptions(years)}
			</select>
		</div>
	);
};

export default AttendanceDateFilters;
