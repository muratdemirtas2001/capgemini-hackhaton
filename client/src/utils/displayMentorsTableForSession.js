import Button from "../components/Button";

const displayMentorsTableForSession = (mentors) => {
	return mentors.map((mentor, index) => {
		const requestMentor = () => {
			console.log(mentor.email);
		};

		return (
			<tr key={`${index}-mentors-to-request`}>
				<td key={`${index}-mentor--name-r`}>{mentor.mentor_name}</td>
				<td key={`${index}-mentor-skills-r`}>{mentor.skills.join(" | ")}</td>
				<td key={`${index}-mentor-request-btn`}>
					<Button
						label="Request"
						mode="primary"
						size="small"
						onClick={requestMentor}
					/>
				</td>
			</tr>
		);
	});
};

export default displayMentorsTableForSession;
