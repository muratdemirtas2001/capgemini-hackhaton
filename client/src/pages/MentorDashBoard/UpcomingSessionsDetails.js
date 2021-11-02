


import React, { useState ,useEffect } from "react";
import "./Modal.css";
const token = localStorage.getItem("users");
function UpcomingSessionDetails({ closeDetailsModal,club_ID}) {
	const [currentSession, setCurrentSession] = useState([]);
	const[topic,setTopic]=useState("");
	const[mentorID,setMentorID]=useState(getMentorID(token))

     
	async function getMentorID (token) {
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        let jsonPayload = decodeURIComponent(atob(base64).split("").map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));
        return  await JSON.parse(jsonPayload).userid;
    }
   // const mentorID= getMentorID(token);
   
	



	useEffect(()=>{
		fetch("/api/mentorsessiondetails/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ club_id: club_ID , userid:mentorID}),
		
		 })
			.then((res) => res.json())
			.then((sessionDetails) => {
	
				
				setCurrentSession(sessionDetails[0]);
				
				setTopic(sessionDetails[0].coursework_link.split("/")[3])
			});

		

	}, [token]);





	return (
		<div className="modalBackground">
			<div className="modalContainer">
				<div className="titleCloseButton">
					<button onClick={() => closeDetailsModal(false)}>X</button>
				</div>
				<div className="title" >
					<h3 style={{fontWeight:"bold"}}>Club Name:   </h3><h3>{currentSession.club_name}</h3> 
				</div>
				<div
					className="body"
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						
					}}
				>
					<div  style={{display:"flex"}}>	<h5 style={{fontWeight:"bold" ,paddingRight:"1rem"}}>Topic: </h5> <h5>{topic}</h5></div>
				<div style={{display:"flex"}} ><h5 style={{fontWeight:"bold" ,paddingRight:"1rem"}}>Club date: </h5> <h5>{currentSession.club_date}</h5></div>	
					<div  style={{display:"flex"}}><h5 style={{fontWeight:"bold" ,paddingRight:"1rem"}}>start time:</h5> <h5>{currentSession.start_time}</h5></div>
				<div  style={{display:"flex"}}>	<h5 style={{fontWeight:"bold" ,paddingRight:"1rem"}}>end time: </h5> <h5>{currentSession.end_time}</h5></div>
				
				<div  style={{display:"flex"}}> < h5 style={{fontWeight:"bold" ,paddingRight:"1rem"}}> Cousework Link :</h5>	<a href= {currentSession.coursework_link} style={{color:"blue"}} target="_blank"> {currentSession.coursework_link}</a> </div>
				</div>
				<div className="footer">
					<button onClick={() => closeDetailsModal(false)} id="closeButton">
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
export default UpcomingSessionDetails;
	
