import checkStudentVolunteerRatio from "../../utils/checkStudentVolunteerRatio";
import Button from "../Button/index";
import "./UpcomingSession.css";

const UpcomingSession = ({
	id,
	title,
	date,
	time,
	numberOfStudents,
	numberOfVolunteers,
}) => {
	const isRatioAcceptable = checkStudentVolunteerRatio(
		numberOfStudents,
		numberOfVolunteers
	);

	return (
		<div
			id={id}
			className={[
				`isRatioAcceptable--${isRatioAcceptable}`,
				"upcoming-session-container",
			].join(" ")}
		>
			<h4> {title} </h4>
			<p>
				{date} @ {time}
			</p>
			<p>
				Students {numberOfStudents} : {numberOfVolunteers} Volunteers
			</p>
			{isRatioAcceptable ? (
				<div>
					<Button label="Details" size="small" mode="secondary" />
					<Button label="Cancel" size="small" mode="secondary" />
				</div>
			) : (
				<>
					<Button label="Request Volunteers" size="small" mode="primary" />
					<div>
						<Button label="Details" size="small" mode="secondary" />
						<Button label="Cancel" size="small" mode="secondary" />
					</div>
				</>
			)}
		</div>
	);
};

export default UpcomingSession;
