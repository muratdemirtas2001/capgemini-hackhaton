//new code
import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";
import "./Mentordashboard.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MentorUpdateSkills from "./MentorUpdateSkills";
import UpcomingSessionDetails from "./UpcomingSessionsDetails";
export default function Mentordashboard() {
	const token = localStorage.getItem("users");
	const [openModal, setOpenModal] = useState(false);
	const [sessionDetailsModal, SetSessionDetailsModal] = useState(false);
	const [sessionDetails, setSessionDetails] = "test1";
	const [users, setUsers] = useState([]);
	const [fullName, setFullName] = useState("");
	const [sessions, SetSessions] = useState([]);
	// const [zoom, setZoom] = useState([]);
	const [mentorSkills, SetMentorSkills] = useState([]);
	console.log(mentorSkills);
	// function parseJwt (token) {
	//  let base64Url = token.split(".")[1];
	//  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	//  let jsonPayload = decodeURIComponent(atob(base64).split("").map(function(c) {
	//    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
	//  }).join(""));
	//  return JSON.parse(jsonPayload);
	// }
	// let ans= parseJwt(token);
	// console.log(ans);
	useEffect(() => {
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
				// console.log(data);
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
				// console.log(keys);
				// console.log(skills);
				// console.log(trueSkills);
				const currentMentorSkills = Object.keys(trueSkills);
				console.log(currentMentorSkills);
				SetMentorSkills(currentMentorSkills);
			});
		//=====================================
		fetch("/api/sessions", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((currentSessions) => {
				// console.log(currentSessions);
				SetSessions(currentSessions);
				// console.log(sessions);
			});
		//=========================================
		// fetch("/api/zoom")
		//  .then((res) => {
		//   if (!res.ok) {
		//    throw new Error(res.statusText);
		//   }
		//   return res.json();
		//  })
		//  .then((body) => {
		//   setZoom(body);
		//  })
		//  .catch((err) => {
		//   console.error(err);
		//  });
	}, [token]);
	// console.log(fullName);
	function handelClick(value) {
		console.log("handelclick called");
		SetSessionDetailsModal(true);
		setSessionDetails(value);
		console.log(sessionDetails);
	}
	// function updateCurrentSkills()
	return (
		<>
			<Logout />
			<div className="container">
				<Tabs>
					<TabList>
						<Tab> Mentor Info </Tab>
						<Tab>Next Session</Tab>
						<Tab>Upcoming Sessions</Tab>
						<Tab>Booked Session</Tab>
						<Tab>Session you Joined </Tab>
					</TabList>
					<TabPanel id="mentorInfo">
						<div className="d11">
							<h3>Welcome : You are logged in as volunteer : {fullName}</h3>
							{openModal && (
								<MentorUpdateSkills
									closeModal={setOpenModal}
									currentSkills={mentorSkills}
									updateCurrentSkills={SetMentorSkills}
								/>
							)}
							<h5>Your Skills are:</h5>
							<ol style={{ fontSize: "150%" }}>
								{mentorSkills.map((e) => (
									<li>{e}</li>
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
						<div className="d3">
							<h3>Next Home Work Club : You have no booked session</h3>{" "}
							<h4>Time left: n/a</h4>
							<div>
								{" "}
								<h4>Number of students signed up: N/a</h4>
							</div>{" "}
							<button type="button" className="btn btn-secondary disabled">
								Join now via Zoom
							</button>
						</div>
					</TabPanel>
					<TabPanel>
						{sessionDetailsModal && (
							<UpcomingSessionDetails
								closeDetailsModal={SetSessionDetailsModal}
								sessionDetail={sessionDetails}
							/>
						)}
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Titel</th>
									<th scope="col">Date and Time</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								{/* {mentorSkills.map((e)=><li >{e}</li>)} */}
								{sessions.map((e) => (
									<tr>
										<td>{e.club_name}</td>
										<td>{e.start_date}</td>
										<td>
											<button
												type="button"
												className="btn btn-info"
												onClick={() => {
													handelClick(e.club_name);
												}}
											>
												Details
											</button>{" "}
											<button type="button" className="btn btn-secondary">
												Sign up
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</TabPanel>
					<TabPanel>
						<div id="booked-sessions">
							<h3>booked Sessions</h3>
							<h4>HW4 Session 7</h4>
							<h6>17/02/2022 18:00 - 21:00</h6>
							<button>Details</button>
							<button>Cancel</button>
							<h4>HW4 Session 8</h4>
							<h6>17/02/2022 18:00 - 21:00</h6>
							<button>Details</button>
							<button>Cancel</button>
							<h4>HW4 Session 9</h4>
							<h6>17/02/2022 18:00 - 21:00</h6>
							<button>Details</button>
							<button>Cancel</button>
							<h4>HW4 Session 10</h4>
							<h6>17/02/2022 18:00 - 21:00</h6>
							<button>Details</button>
							<button>Cancel</button>
						</div>
					</TabPanel>
					<TabPanel></TabPanel>
				</Tabs>
			</div>
		</>
	);
}
// old code
/*
import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";
import "./Mentordashboard.css";
const token = localStorage.getItem("users");
console.log(token);
/*
function parseJwt (token) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(atob(base64).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
  return JSON.parse(jsonPayload);
}
let ans= parseJwt(token);
console.log(ans);
*/
/*
export default function Mentordashboard() {
  const token = localStorage.getItem("users");
 const [users, setUsers] = useState([]);
  const[fullName, setFullName]=useState("");
 const [zoom, setZoom] = useState([]);
 useEffect(() => {
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
        setFullName(data.firstname+" "+data.lastname);
   });
  fetch("/api/zoom")
   .then((res) => {
    if (!res.ok) {
     throw new Error(res.statusText);
    }
    return res.json();
   })
   .then((body) => {
    setZoom(body);
   })
   .catch((err) => {
    console.error(err);
   });
 }, [token]);
 console.log(fullName);
  function updateSkills () {
 }
  return (
    <>
      <Logout />
      <div id="container">
        <div className="d1"><h3>Welcome : You are logged in as volunteer {fullName}</h3>
       <ol>
         <li>HTML5</li>
         <li>CSS</li>
         <li>javaScript</li>
         <li>React</li>
       </ol>
        <button type="button" className="btn btn-success" onClick={updateSkills}>Update your skills</button>
          </div>
 <div className="d2"><h3>booked Sessions</h3>
                        <h4>HW4 Session 7</h4>
                        <h6>17/02/2022 18:00 - 21:00</h6>
                        <button type="button" className="btn btn-info">Details</button>
                        <button type="button" className="btn btn-danger">Cancel</button>
                        <h4>HW4 Session 8</h4>
                        <h6>17/02/2022 18:00 - 21:00</h6>
                        <button type="button" className="btn btn-info">Details</button>
                        <button type="button" className="btn btn-danger">Cancel</button>
                        <h4>HW4 Session 9</h4>
                        <h6>17/02/2022 18:00 - 21:00</h6>
                        <button type="button" className="btn btn-info">Details</button>
                        <button type="button" className="btn btn-danger">Cancel</button>
                        <h4>HW4 Session 10</h4>
                        <h6>17/02/2022 18:00 - 21:00</h6>
                        <button type="button" className="btn btn-info">Details</button>
                        <button type="button" className="btn btn-danger">Cancel</button></div>
                        <div className="d3">
                        <h3>Next Home Work Club : Session 5   17:00-19:00 01/10/2021</h3> <h4>Time left: 3 Days 09 Hours 16 minuts</h4>
                        <div> <h4>Number of students signed up: 15</h4></div> <button type="button" className="btn btn-secondary">Join now via Zoom</button>
                        </div>
 <div className="d4"><h3>Upcoming Session</h3>
                          <h4>HW4 Session 6</h4>
                          <h6>17/02/2022 18:00 - 21:00</h6>
                          <div><h4>Topic:</h4><h5>React</h5></div>
                          <h4> link to CYF syllabus:</h4><h5>https://syllabus.codeyourfuture.io/react/week-1/homework</h5>
                          </div>
</div>
    </>
  );
}
*/
