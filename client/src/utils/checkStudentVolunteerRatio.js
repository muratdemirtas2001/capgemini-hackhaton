const checkStudentVolunteerRatio = (numberOfStudents, numberOfVolunteers) => {
	const minNumberOfVolunteersNeeded = numberOfStudents / 6;
	const isRatioAcceptable =
		minNumberOfVolunteersNeeded > numberOfVolunteers ? false : true;
	return isRatioAcceptable;
};

export default checkStudentVolunteerRatio;
