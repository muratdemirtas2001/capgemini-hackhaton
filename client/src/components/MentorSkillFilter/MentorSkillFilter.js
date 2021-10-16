import skills from "../../constants/skills";
import generateOptions from "../../utils/generateOptions";
import "./MentorSkillFilter";

const MentorSkillFilter = ({ skill, setSkill }) => {
	const applySkillFilter = (event) => {
		setSkill(event.target.value);
	};

	return (
		<div className="skill-filter-container">
			<p>Filter by skill</p>
			<select value={skill || skills[0]} onChange={applySkillFilter}>
				{generateOptions(skills)}
			</select>
		</div>
	);
};

export default MentorSkillFilter;
