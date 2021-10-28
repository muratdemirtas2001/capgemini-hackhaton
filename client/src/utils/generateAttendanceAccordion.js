import { BsChevronCompactDown } from "react-icons/bs";
import {
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";
import ResponsiveTable from "../components/ResponsiveTable";
import displayAttendanceTable from "./displayAttendanceTable";

const generateAttendanceAccordion = (sessions) => {
	const headings = ["Full name", "Role", "Cohort", "Attendance status"];
	return sessions.map((session, index) => {
		return (
			<AccordionItem key={`${index}--attendance-accordion`} uuid={index + 1}>
				<AccordionItemHeading>
					<AccordionItemButton>
						<div className="accordion-item-container">
							<h4>Session | 10 registered </h4>
							<BsChevronCompactDown size={24} />
						</div>
					</AccordionItemButton>
				</AccordionItemHeading>
				<AccordionItemPanel>
					<ResponsiveTable
						data={sessions}
						headings={headings}
						displayFunction={displayAttendanceTable}
					/>
				</AccordionItemPanel>
			</AccordionItem>
		);
	});
};

export default generateAttendanceAccordion;
