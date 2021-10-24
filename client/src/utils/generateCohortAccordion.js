import {
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";
import ResponsiveTable from "../components/ResponsiveTable";
import displayCohortsTable from "./displayCohortsTable";

const generateCohortAccordion = (cohorts) => {
	console.log(cohorts);
	const headings = ["Full name", "Email"];
	return cohorts.map((cohort, index) => {
		return (
			<AccordionItem key={`${index}--cohort-accordion`} uuid={index + 1}>
				<AccordionItemHeading>
					<AccordionItemButton>
						<h4>{cohort[0]} </h4>
					</AccordionItemButton>
				</AccordionItemHeading>
				<AccordionItemPanel>
					<ResponsiveTable
						data={cohort[1]}
						headings={headings}
						displayFunction={displayCohortsTable}
					/>
				</AccordionItemPanel>
			</AccordionItem>
		);
	});
};

export default generateCohortAccordion;
