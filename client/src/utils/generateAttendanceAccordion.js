import {
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";
import ResponsiveTable from "../components/ResponsiveTable";

const generateAttendanceAccordion = (sessions) => {
    const headings = ["Full name", "Cohort", "Attendance status"]
	return sessions.map((session, index) => {
		const atendeesNumber = session.students.length + session.students.length;
		return (
			<AccordionItem uuid={index}>
				<AccordionItemHeading>
					<h4>{session.title} </h4>
					<p> {atendeesNumber} attendees </p>
					<AccordionItemButton>+</AccordionItemButton>
				</AccordionItemHeading>
				<AccordionItemPanel>
                    <ResponsiveTable headings={headings} data={} displayFunction={}/>
                </AccordionItemPanel>
			</AccordionItem>
		);
	});
};

export default generateAttendanceAccordion;
