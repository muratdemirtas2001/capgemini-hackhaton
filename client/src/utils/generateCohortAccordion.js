import { BsChevronCompactDown } from "react-icons/bs";
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
						<div className="accordion-item-container">
							<h4>{cohort[0]} </h4>
							<BsChevronCompactDown size={24} />
						</div>
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
