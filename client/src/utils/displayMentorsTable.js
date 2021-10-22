const displayMentorsTable = (mentors) => {
	return mentors.map((mentor, index) => {
		return (
			<tr key={`${index}-mentors-table-row`}>
				<td key={`${index}-mentor--name`}>Billy Smith</td>
				<td key={`${index}-email`}>billy.smith@email.com</td>
				<td key={`${index}-skills`}>Arrays, JS, Jquery</td>
				<td key={`${index}-mentor-attendance`}>11 sessions</td>
			</tr>
		);
	});
};

export default displayMentorsTable;
