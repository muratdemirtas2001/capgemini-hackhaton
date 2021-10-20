const displayAttendanceTable = (sessions) => {
	return sessions.map((session, index) => {
		return (
			<tr key={`${index}-attendance-table-row`}>
				<td key={`${index}-name`}>Billy Smith</td>
				<td key={`${index}-role`}>Student</td>
				<td key={`${index}-cohort`}>Cohort 1</td>
				<td key={`${index}-attendance`}>Attended</td>
			</tr>
		);
	});
};

export default displayAttendanceTable;
