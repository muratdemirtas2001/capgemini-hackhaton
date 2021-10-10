import "./AttendanceDateFilters.css";

import Button from "../Button";

const AttendanceDateFilters = ({ month, setMonth, year, setYear }) => {
	return (
		<div className="filters-container">
			<select></select>
			<select></select>
			<Button label="Filter" mode="primary" size="small" />
		</div>
	);
};

export default AttendanceDateFilters;
