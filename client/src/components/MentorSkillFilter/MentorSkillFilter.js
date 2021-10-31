import "./MentorSkillFilter.css";
import skills from "../../constants/skills";
import generateOptions from "../../utils/generateOptions";

const MentorSkillFilter = ({ setSkill }) => {
	const applySkillFilter = (event) => {
		console.log(event.target.value);
		setSkill(event.target.value);
	};

	return (
		<div className="skill-filter-container">
			<p>Filter by skill</p>
			<select onBlur={applySkillFilter}>{generateOptions(skills)}</select>
		</div>
	);
};

export default MentorSkillFilter;
