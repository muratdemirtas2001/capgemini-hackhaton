const displayCohortsTable = (cohort) => {
	return cohort.map((student, index) => {
		return (
			<tr key={`${index}-cohort-table-row`}>
				<td key={`${index}-name`}>{student.student_name}</td>
				<td key={`${index}-email`}>{student.email}</td>
			</tr>
		);
	});
};

export default displayCohortsTable;
