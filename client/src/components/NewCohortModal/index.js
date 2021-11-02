import { Modal } from "react-bootstrap";
import { useRef } from "react";

import Button from "../Button";

const NewCohortModal = ({ setShowModal, show }) => {
	const handleClose = () => setShowModal(false);
	const cohortName = useRef();

	const createCohort = () => {
		console.log(cohortName.current.value);
		//call api to create cohort
			const token = localStorage.getItem("users");

		let info = {
			cohort_name: cohortName.current.value,
		};

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(info),
		};
		fetch("/api/createcohort", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log("hello new create cohort");
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
				<Modal.Title>Create new cohort</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Enter the name of the new cohort below.</p>
				<input ref={cohortName}></input>
				<Button
					label="Create cohort"
					onClick={createCohort}
					size="medium"
					mode="primary"
				/>
			</Modal.Body>
		</Modal>
	);
};

export default NewCohortModal;
