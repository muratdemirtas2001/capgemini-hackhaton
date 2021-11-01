import { Accordion } from "react-accessible-accordion";
import cohortsInfo from "../../data/cohortsInfo";
import generateCohortAccordion from "../../utils/generateCohortAccordion";
import { useEffect, useState } from "react";
const CohortsAccordion = () => {
	// call api to fetch cohort info here
	// replace 'cohortsInfo' with what comes back from api
	const token = localStorage.getItem("users");

	const [accordions, setAccordions] = useState();
  useEffect(()=>{
fetch("/api/allcohorts", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
})
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		const cohorts = Object.entries(data);
		const newData = generateCohortAccordion(cohorts);
		setAccordions(newData);
	});
  },[]);
	
	return <Accordion preExpanded={[1]}>{accordions}</Accordion>;
};

export default CohortsAccordion;
