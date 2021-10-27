import { useRef } from "react";
import { Modal } from "react-bootstrap";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import $ from "jquery";

import Button from "../Button";
import validateFutureDates from "../../utils/validateFutureDates";

const NewSessionModal = ({ show, setShowModal }) => {
	const handleClose = () => setShowModal(false);

	const createNewSession = () => {
		const dateTimeUnformatted = $(".form-control").attr("value");
		console.log(dateTimeUnformatted);
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add a new admin</Modal.Title>
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
