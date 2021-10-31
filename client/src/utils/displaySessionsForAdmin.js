import { useState } from "react";
import { Modal } from "react-bootstrap";

import Button from "../components/Button";
import ResponsiveTable from "../components/ResponsiveTable";
import mentorsData from "../data/mentors";
import checkStudentVolunteerRatio from "./checkStudentVolunteerRatio";
import displayMentorsTableForSession from "./displayMentorsTableForSession";

const displayUpcomingSessionsForAdmin = (upcomingSessions) => {
	return upcomingSessions.map((session, index) => {
		const [show, setShow] = useState();
		const [modalContent, setModalContent] = useState();
		const handleClose = () => setShow(false);
		const id = session.session_id;

		const getSessionDetails = () => {
			console.log(id);
			//make api request to get details of session and pass id of the session
			setModalContent("Details");
			setShow(true);
		};

		const getVolunteers = () => {
			// make api call to get mentors and replace the mentorsData var with fetched data
			setModalContent(
				<ResponsiveTable
					data={mentorsData}
					displayFunction={displayMentorsTableForSession}
					headings={["Name", "Skills", "Contact"]}
				/>
			);
			setShow(true);
		};

		const isRatioAcceptable = checkStudentVolunteerRatio(
			session.registered_student,
			session.registered_mentor
		);
		return (
			<>
				<tr
					className={[`isRatioAcceptable--${isRatioAcceptable}`].join(" ")}
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
					<td key={`${index}-actions`}>
						{isRatioAcceptable ? (
							<div>
								<Button
									label="Details"
									size="small"
									mode="secondary"
									onClick={getSessionDetails}
								/>
							</div>
						) : (
							<div>
								<Button
									label="Details"
									size="small"
									mode="secondary"
									onClick={getSessionDetails}
								/>
								<Button
									label="Request Volunteers"
									size="small"
									mode="primary"
									onClick={getVolunteers}
								/>
							</div>
						)}
					</td>
				</tr>
				<Modal show={show} onHide={handleClose} key={`${index}-details-modal`}>
					<Modal.Header closeButton>
						<Modal.Title>{session.session_title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div id="session-container" data={id}>
							{modalContent}
						</div>
					</Modal.Body>
				</Modal>
			</>
		);
	});
};

export default displayUpcomingSessionsForAdmin;
