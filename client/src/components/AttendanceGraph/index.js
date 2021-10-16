import { Bar } from "react-chartjs-2";
import {
	attendanceGraphDefaults,
	options,
} from "../../constants/attendanceGraphConfig";

import "./AttendanceGraph.css";

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
