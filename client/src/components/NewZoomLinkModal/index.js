import { Modal } from "react-bootstrap";
import Button from "../Button";
import { useRef } from "react";

const NewZoomLinkModal = ({ show, setShowModal }) => {
	const handleClose = () => setShowModal(false);
	const zoomLink = useRef();

	const updateZoomLink = () => {
		console.log(zoomLink.current.value);
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
