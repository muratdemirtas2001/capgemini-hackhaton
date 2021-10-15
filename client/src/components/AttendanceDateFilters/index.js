import "./AttendanceDateFilters.css";

import Button from "../Button";
import generateOptions from "../../utils/generateOptions";
import { useEffect } from "react";

const AttendanceDateFilters = ({
	month,
	setMonth,
	year,
	setYear,
	currentMonth,
	currentYear,
}) => {
	const activeMonthFilter = month ? month : currentMonth;
	const activeYearFilter = year ? year : currentYear;
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

	useEffect(() => {
		console.log("data fetching for", activeYearFilter, activeMonthFilter);
	});

	const applyMonthFilter = (event) => {
		setMonth(event.target.value);
	};

	const applyYearFilter = (event) => {
		setYear(event.target.value);
	};

	return (
		<div className="filters-container">
			<select
				id="month-filter"
				value={activeMonthFilter}
				onChange={applyMonthFilter}
			>
				{generateOptions(months)}
			</select>
			<select
				is="year-filter"
				value={activeYearFilter}
				onChange={applyYearFilter}
			>
				{generateOptions(years)}
			</select>
		</div>
	);
};

export default AttendanceDateFilters;
