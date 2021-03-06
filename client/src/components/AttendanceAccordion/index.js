import { Accordion } from "react-accessible-accordion";
import generateAttendanceAccordion from "../../utils/generateAttendanceAccordion";

import "./AttendanceAccordion.css";

const AttendanceAccordion = ({ attendanceInformation }) => {
	const accordions = generateAttendanceAccordion(attendanceInformation);
	return <Accordion preExpanded={[1]}>{accordions}</Accordion>;
};

export default AttendanceAccordion;
