import { Modal } from "react-bootstrap";
import Button from "../Button";
import { useRef } from "react";

const AddAdminModal = ({ show, setShowModal }) => {
	const handleClose = () => setShowModal(false);
	const adminEmail = useRef();

	const addAdmin = () => {
		//call api to add amin
		console.log(adminEmail.current.value);
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add a new admin</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p> Enter the email address of the user you'd like to make an admin.</p>
				<input ref={adminEmail}></input>
				<Button
					label="Add Admin"
					onClick={addAdmin}
					size="medium"
					mode="primary"
				/>
			</Modal.Body>
		</Modal>
	);
};

export default AddAdminModal;
