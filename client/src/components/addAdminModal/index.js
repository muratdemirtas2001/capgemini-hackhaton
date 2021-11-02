import { Modal } from "react-bootstrap";
import Button from "../Button";
import { useRef } from "react";

const AddAdminModal = ({ show, setShowModal }) => {
	const handleClose = () => setShowModal(false);
	const adminEmail = useRef();

	const addAdmin = () => {
		//call api to add amin
		const token = localStorage.getItem("users");

		console.log(adminEmail.current.value);
		let info = {
			email: adminEmail.current.value,
		};

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(info),
		};
		fetch("/api/assignadmin", requestOptions)
			.then((response) => response.json())
			.then((data) => {
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
