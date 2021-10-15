import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
import AttendanceDateFilters from "../AttendanceDateFilters";

import "./AttendanceGraph.css";

const AttendanceGraph = ({ type }) => {
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
			<div className="graph-container">
				<h3>{type} attendance </h3>
				<Bar data={state} options={options} />
			</div>
		</>
	);
};
export default AttendanceGraph;
