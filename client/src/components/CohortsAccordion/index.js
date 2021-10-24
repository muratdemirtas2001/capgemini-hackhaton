import { Accordion } from "react-accessible-accordion";
import cohortsInfo from "../../data/cohortsInfo";
import generateCohortAccordion from "../../utils/generateCohortAccordion";

const CohortsAccordion = () => {
	// fetch cohort info here

	const cohorts = Object.entries(cohortsInfo);

	const accordions = generateCohortAccordion(cohorts);
	return <Accordion preExpanded={[1]}>{accordions}</Accordion>;
};

export default CohortsAccordion;
