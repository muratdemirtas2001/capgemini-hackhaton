const displayMentorsTable = (mentors) => {
	return mentors.map((mentor, index) => {
		return (
			<tr key={`${index}-mentors-table-row`}>
				<td key={`${index}-mentor--name`}>{mentor.mentor_name}</td>
				<td key={`${index}-email`}>{mentor.email}</td>
				<td key={`${index}-skills`}>{mentor.skills.join(" | ")}</td>
				<td key={`${index}-mentor-attendance`}>11 sessions</td>
			</tr>
		);
	});
};

export default displayMentorsTable;
