import { Modal } from "react-bootstrap";
import Button from "../Button";
import { useRef } from "react";

const DeleteUserModal = ({ show, setShowModal }) => {
	const handleClose = () => setShowModal(false);
	const userEmail = useRef();

	const deleteUser = () => {
		//call api to delete user
		const token = localStorage.getItem("users");

		console.log(userEmail.current.value);
		let info = {
			email: userEmail.current.value,
		};

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(info),
		};
		fetch("/api/deleteaccount", requestOptions)
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
