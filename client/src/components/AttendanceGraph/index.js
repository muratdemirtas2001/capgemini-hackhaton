import { Bar } from "react-chartjs-2";

import "./AttendanceGraph.css";

import {
	attendanceGraphDefaults,
	options,
} from "../../constants/attendanceGraphConfig";

const AttendanceGraph = () => {
	return (
		<>
			<div className="graph-container">
				<Bar data={attendanceGraphDefaults} options={options} />
			</div>
		</>
	);
};
export default AttendanceGraph;
