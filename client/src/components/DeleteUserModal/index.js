import { Modal } from "react-bootstrap";
import Button from "../Button";
import { useRef } from "react";

const DeleteUserModal = ({ show, setShowModal }) => {
	const handleClose = () => setShowModal(false);
	const userEmail = useRef();

	const deleteUser = () => {
		console.log(userEmail.current.value);
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Delete a user</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Enter the email address of the user you'd like to make an delete.</p>
				<input ref={userEmail}></input>
				<Button
					label="Delete user"
					onClick={deleteUser}
					size="medium"
					mode="primary"
				/>
			</Modal.Body>
		</Modal>
	);
};

export default DeleteUserModal;
