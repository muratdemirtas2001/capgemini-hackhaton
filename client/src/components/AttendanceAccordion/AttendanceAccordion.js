import { Accordion } from "react-accessible-accordion";
import generateAttendanceAccordion from "../../utils/generateAttendanceAccordion";

const AttendanceAccordion = (sessions) => {
	return (
		<Accordion preExpanded={["1"]}>
			{generateAttendanceAccordion(sessions)}
		</Accordion>
	);
};
