import { Accordion } from "react-accessible-accordion";
import cohortsInfo from "../../data/cohortsInfo";
import generateCohortAccordion from "../../utils/generateCohortAccordion";

const CohortsAccordion = () => {
	// call api to fetch cohort info here
	// replace 'cohortsInfo' with what comes back from api

	const cohorts = Object.entries(cohortsInfo);

	const accordions = generateCohortAccordion(cohorts);
	return <Accordion preExpanded={[1]}>{accordions}</Accordion>;
};

export default CohortsAccordion;
