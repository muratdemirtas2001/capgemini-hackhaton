import Button from "../components/Button";
import checkStudentVolunteerRatio from "./checkStudentVolunteerRatio";

const displayUpcomingSessionsForAdmin = (upcomingSessions) => {
	return upcomingSessions.map((session, index) => {
		const isRatioAcceptable = checkStudentVolunteerRatio(
			session.numberOfStudents,
			session.numberOfVolunteers
		);
		return (
			<tr
				className={[
					`isRatioAcceptable--${isRatioAcceptable}`,
					"upcoming-session-container",
				].join(" ")}
				key={`${index}-table-row`}
			>
				<td key={`${index}-title`}> {session.title}</td>
				<td key={`${index}-date`}>
					{session.date} {session.time}
				</td>
				<td key={`${index}-ratio`}>
					{" "}
					{session.numberOfStudents} : {session.numberOfVolunteers}
				</td>
				<td key={`${index}-actions`} id={session.id}>
					{isRatioAcceptable ? (
						<div>
							<Button label="Details" size="small" mode="secondary" />
							<Button label="Cancel" size="small" mode="secondary" />
						</div>
					) : (
						<div>
							<Button label="Request Volunteers" size="small" mode="primary" />
							<Button label="Details" size="small" mode="secondary" />
							<Button label="Cancel" size="small" mode="secondary" />
						</div>
					)}
				</td>
			</tr>
		);
	});
};

export default displayUpcomingSessionsForAdmin;
