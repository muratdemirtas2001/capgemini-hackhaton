import { Modal } from "react-bootstrap";
import { useRef } from "react";

import Button from "../Button";

const NewZoomLinkModal = ({ show, setShowModal }) => {
	const handleClose = () => setShowModal(false);
	const zoomLink = useRef();

	const updateZoomLink = () => {
				const token = localStorage.getItem("users");

		//call api to update zoom link
		console.log(zoomLink.current.value);
		let zoom_link = zoomLink.current.value;
		let info = {
			zoom_link: zoom_link,
		};

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(info),
		};
		fetch("/api/changezoomlink", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log("hello new zoom");
				console.log(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Update session Zoom link</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>
					Enter the new link students and mentors can use to access sessions.
				</p>
				<input ref={zoomLink}></input>
				<Button
					label="Update link"
					onClick={updateZoomLink}
					size="medium"
					mode="primary"
				/>
			</Modal.Body>
		</Modal>
	);
};

export default NewZoomLinkModal;
