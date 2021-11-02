
import React, { useEffect, useState } from "react";

import Logout from "../../components/Logout";
import "./Mentordashboard.css";
import Footer from "../../components/Footer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MentorUpdateSkills from "./MentorUpdateSkills";
import UpcomingSessionDetails from "./UpcomingSessionsDetails";
import SingingUpConfirmation from "./SigningUpConfirmation";
import Moment from 'react-moment';
export default function Mentordashboard() {
	const token = localStorage.getItem("users");
	const [openModal, setOpenModal] = useState(false);
	const [zoom, setZoom] = useState([]);
	const [sessionDetailsModal, SetSessionDetailsModal] = useState(false);

	const [signingConfirmation, setSigningConfirmation]=useState(false);
	const [confirmedSessions, setConfirmedSessions] = useState([]);
	const [users, setUsers] = useState([]);
	const [fullName, setFullName] = useState("");
	const [sessions, SetSessions] = useState([]);
	const [mSkills,setMSkills]=([]);
	const [mentorSkills, SetMentorSkills] = useState([]);
	const [currentSession, setCurrentSession] = useState([]);
	const [clubId,setClubId]= useState(0);
	const [clubSignedId,setClubSignedId]= useState(0);
	

	
	
	useEffect(() => {
    //       fetch("/api/zoom")
    //  .then((res) => {
    //    if (!res.ok) {
    //      throw new Error(res.statusText);
    //    }
    //    return res.json();
    //  })
    //  .then((body) => {
    //    setZoom(body);
	//    console.loog(zoom);
    //  })
    //  .catch((err) => {
    //    console.error(err);
    //  });


		fetch("/api/dashboard", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setUsers(data);
				setFullName(data.firstname + " " + data.lastname);

			});
		fetch("/api/mentor_skills", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((skills) => {
				const keys = Object.keys(skills);
				const trueSkills = Object.fromEntries(
					Object.entries(skills).filter(([key, value]) => value === true)
				);

				const currentMentorSkills = Object.keys(trueSkills);

				SetMentorSkills(currentMentorSkills);
			});
	
		fetch("/api/sessions", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		 })
			.then((res) => res.json())
			.then((currentSessions) => {
				
				SetSessions(currentSessions);
				setCurrentSession(currentSession);
				
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
					setConfirmedSessions(confirmedSessions);
					
				});
	

			



	}, [token]);

	
    

	    


  function checkNotes(notes){
	  if (notes== "NULL")
	  return "No Notes"
	  else return notes;
  }
	


	function handelClick(event) {
	

	setClubId(event.target.value) ;

	 SetSessionDetailsModal(true);
	}
 function handelSignUpClick(event){
	setSigningConfirmation(true);
	setClubSignedId(event.target.value);

	}
  
	
	return (
		<>
			<Logout />
			<div className="container">
				<Tabs>
					<TabList>
				     	<Tab> Mentor Info </Tab>
						<Tab>Upcoming Sessions</Tab>
						<Tab >Booked Session</Tab>

					</TabList>
					<TabPanel id="mentorInfo">
						<div className="d11">
							<h3>Welcome : You are logged in as volunteer : {fullName}</h3>
							{openModal && (
								<MentorUpdateSkills
								    token={token}
									closeModal={setOpenModal}
									currentSkills={mentorSkills}
									updateCurrentSkills={SetMentorSkills}
								/>
							)}
							<h5>Your Skills are:</h5>
							<ol style={{ fontSize: "150%" }}>
								{mentorSkills.map((e,index) => (
									<li key={index}>{e}</li>
								))}
							</ol>
							<button


								type="button"
								className="btn btn-success"
								onClick={() => {
									setOpenModal(true);
								}}
							>
								Update your skills
							</button>
						</div>
					</TabPanel>
					

					

					<TabPanel>
						{sessionDetailsModal && (
							<UpcomingSessionDetails
								closeDetailsModal={SetSessionDetailsModal}
								sessionDetail={currentSession}
								 club_ID={clubId}
								
							/>
						)}
						{signingConfirmation&& (
						<SingingUpConfirmation
						 closeConfirmationModal={setSigningConfirmation}
						 club_id={clubSignedId}
						 confirmBooking={setConfirmedSessions}
						
						 />
						 )}
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Titel</th>
									<th scope="col">Date and Time</th>
									<th scope="col"> Cutoff Date and Time</th>
									<th>Session Details/Sign up</th>
								</tr>
							</thead>
							<tbody>

								{sessions.map((e,index) => (
									<tr key={index}>
										<td >{e.club_name}</td>
										<td><Moment date={e.start_date } /> </td>
										<td style={{color:"red"}}> <Moment date={e.cutoff_date} />  </td>
										<td>
											<button
												type="button"
												className="btn btn-info"
												value={e.id}
												onClick={(event) => {
					
													handelClick(event);
												}}
											>
												Details
											</button>{" "}
											<button type="button" className="btn btn-success" value={e.id}
												onClick={(event) => {
													
													handelSignUpClick(event);
												}}>
												Sign up
											</button>
										
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</TabPanel>
					<TabPanel>
					<table className="table">
							<thead>
								<tr>
									<th scope="col">Titel</th>
									<th scope="col">Date and Time</th>
									<th scope="col"> Days left</th>
									<th scope="col"> Student Notes</th>
									<th>Join Session</th>
								</tr>
							</thead>
							<tbody>

								{confirmedSessions.map((e,index) => (
									<tr key={index}>
										<td >{e.club_name}</td>
										<td><Moment date={e.start_date } /> </td>
										<td>  <Moment fromNow>{e.start_date }</Moment> </td>
										<td>{checkNotes(e.free_note)}</td>
										
										<td>
											<button
												type="button"
												className="btn btn-info"
												value={e.id}
												onClick={(event) => {
													window.open("https://zoom.us/j/93139078501?pwd=MzhJQS9VRWIxRWVMZkZQZjZTTmFhZz09", '_blank');
													
												}}
											>
												Join by Zoom
											</button>
											<button type="button" className="btn btn-danger" value={e.id}
												onClick={(event) => {
													
													
												}}>
												Cancel Session
											</button>
											
										</td>
									</tr>
								))}
							</tbody>
						</table>
					
    </TabPanel>

	

 
				</Tabs>
				
			</div>
			
		</>
	);
}


//updateConfirmedSessions={setConfirmedSessions}