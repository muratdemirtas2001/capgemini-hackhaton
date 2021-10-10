import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
import AttendanceDateFilters from "../AttendanceDateFilters";

import "./AttendanceGraph.css";

const AttendanceGraph = () => {
	const currentMonth = "September";
	const currentYear = 2023;

	const [month, setMonth] = useState(currentMonth);
	const [year, setYear] = useState(currentYear);

	defaults.color = "#f8f9fa";
	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};

	const state = {
		labels: ["January", "February", "March", "April", "May"],
		datasets: [
			{
				backgroundColor: "#ed4343",
				data: [65, 59, 80, 81, 56],
				label: "Attendance",
			},
		],
	};

	return (
		<>
			<div className="graph-container white-text">
				<AttendanceDateFilters
					month={month}
					setMonth={setMonth}
					year={year}
					setYear={setYear}
				/>
				<Bar data={state} options={options} />
			</div>
		</>
	);
};
export default AttendanceGraph;
