import "./MentorSkillFilter.css";
import skills from "../../constants/skills";
import generateOptions from "../../utils/generateOptions";

const MentorSkillFilter = ({ setSkill, mentors, setMentors,setFilteredMentor }) => {
	const applySkillFilter = (event) => {
		setMentors(mentors);
		console.log(event.target.value);
		setSkill(event.target.value);
		let newMentors = mentors.filter((mentor) => {
			console.log("hello");
			console.log(mentor.skills);
			return mentor.skills.includes(event.target.value);
		});
		console.log("NEW", newMentors);
		setFilteredMentor(newMentors);
	};

	return (
		<div className="skill-filter-container">
			<p>Filter by skill</p>
			<select onChange={applySkillFilter}>{generateOptions(skills)}</select>
		</div>
	);
};

export default MentorSkillFilter;
