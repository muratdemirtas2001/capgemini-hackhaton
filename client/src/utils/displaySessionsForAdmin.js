import Button from "../components/Button";
import checkStudentVolunteerRatio from "./checkStudentVolunteerRatio";

const displayUpcomingSessionsForAdmin = (upcomingSessions) => {
	return upcomingSessions.map((session, index) => {
		const isRatioAcceptable = checkStudentVolunteerRatio(
			session.registered_student,
			session.registered_mentor
		);
		return (
			<tr
				className={[
					`isRatioAcceptable--${isRatioAcceptable}`,
					"upcoming-session-container",
				].join(" ")}
				key={`${index}-table-row`}
			>
				<td key={`${index}-title`}> {session.session_title}</td>
				<td key={`${index}-date`}>
					{session.session_date} {session.start_time} - {session.end_time}
				</td>
				<td key={`${index}-ratio`}>
					{" "}
					{session.registered_student} : {session.registered_mentor}
				</td>
				<td key={`${index}-actions`} id={session.session_id}>
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
