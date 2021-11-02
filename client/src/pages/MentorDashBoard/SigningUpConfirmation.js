import React, { useEffect } from "react";
import "./Modal.css";
const token = localStorage.getItem("users");
//function SingingUpConfirmation({ closeConfirmationModal,club_id,updateConfirmedSessions }) {

	function SingingUpConfirmation({ closeConfirmationModal,club_id,confirmBooking}) {
	
	
    
	useEffect(()=>{

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ club_id:club_id }),
		};
		fetch("/api/mentorbooksession",requestOptions )
			.then((res) => res.json())
			.then((result) => {
			});

		fetch("/api/mentorconfirmedbookedsessions", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			 })
				.then((res) => res.json())
				.then((confirmedSessions) => {
				
					console.log("fetch called")
					console.log(confirmedSessions);
					//updateConfirmedSessions(confirmedSessions);
					confirmBooking(confirmedSessions)
					
				});
	

	}, [token]);

	return (
		<div className="modalBackground">
			<div className="modalContainer">
				<div className="titleCloseButton">
					<button onClick={() => closeConfirmationModal(false)}>X</button>
				</div>
				<div className="title">

				</div>
				<div
					className="body"
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<div style={{border:"1p solid black", padding:"1rem",margin:"5px", backgroundColor:"#31d382"}}><h5>Confirmed : You have signed up successfully for this Session.</h5></div>
					<div ><h5>Thank you for signing up! </h5></div>
				</div>
				<div className="footer">
					<button onClick={() => closeConfirmationModal(false)} id="closeButton">
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
export default SingingUpConfirmation;
