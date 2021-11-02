import { Modal } from "react-bootstrap";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import $ from "jquery";
const moment = require("moment");

import Button from "../Button";
import validateFutureDates from "../../utils/validateFutureDates";

const NewSessionModal = ({ show, setShowModal }) => {
	const handleClose = () => setShowModal(false);

	const createNewSession = () => {
		const token = localStorage.getItem("users");

		//call api to create session
		const dateTimeUnformatted = $(".form-control").attr("value");
		console.log(dateTimeUnformatted);
		let newFormattedDay = moment(dateTimeUnformatted).format("YYYY-MM-DD");
		console.log(newFormattedDay);

		let info = {
			session_date: newFormattedDay,
			start_time: "18:00",
			end_time: "20:00",
		};

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(info),
		};
		fetch("/api/createnewsession", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log("hello new create session");
				console.log(data);
				setShowModal(false);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Create a new session</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>
					Enter the date and time you would like to the new session to take
					place.
				</p>
				<Datetime
					isValidDate={validateFutureDates}
					closeOnSelect={true}
					className="form-control-override"
				/>
				<Button
					label="Create session"
					onClick={createNewSession}
					size="medium"
					mode="primary"
				/>
			</Modal.Body>
		</Modal>
	);
};

export default NewSessionModal;
