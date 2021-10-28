import { Modal } from "react-bootstrap";
import { useRef } from "react";

import Button from "../Button";

const NewCohortModal = () => {
	const handleClose = () => setShowModal(false);
	const cohortName = useRef();

	const createCohort = () => {
		console.log(cohortName.current.value);
		//call api
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Create new cohort</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Enter the name of the new cohort below.</p>
				<input ref={cohortName}></input>
				<Button
					label="Update link"
					onClick={createCohort}
					size="medium"
					mode="primary"
				/>
			</Modal.Body>
		</Modal>
	);
};

export default NewCohortModal;
