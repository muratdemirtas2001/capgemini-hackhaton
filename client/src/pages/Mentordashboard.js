
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
      const [openModal,setOpenModal]=useState(false);
      const [sessionDetailsModal,SetSessionDetailsModal]= useState(false);
      const [sessionDetails,setSessionDetails]=("test1");
      const [users, setUsers] = useState([]);
      const[fullName, setFullName]=useState("");

      const [sessions, SetSessions]=useState([]);
      // const [zoom, setZoom] = useState([]);
      const [mentorSkills,SetMentorSkills]=useState([]);
      console.log(mentorSkills);



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
                    const keys= Object.keys(skills);


                    const trueSkills = Object.fromEntries(
                        Object.entries(skills).filter(([key, value]) => value === true) );

                    // console.log(keys);
                    // console.log(skills);
                    // console.log(trueSkills);
                    const currentMentorSkills=Object.keys(trueSkills);
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



SetSessions(currentSessions);


});





   }, [token]);


   function handelClick (value)  {
     console.log("handelclick called");
    SetSessionDetailsModal(true);
    setSessionDetails(value);
    console.log(sessionDetails);


  }



  return(

    <>
     <Logout />

<div className="container">
     <Tabs>

    <TabList >

      <Tab> Mentor Info   </Tab>
      <Tab >Next Session</Tab>
      <Tab>Upcoming Sessions</Tab>
      <Tab>Booked Session</Tab>
      <Tab>Session you Joined </Tab>

    </TabList>

    <TabPanel id="mentorInfo">
    <div className="d11"><h3>Welcome : You are logged in as volunteer : {fullName}</h3>
         {openModal &&<MentorUpdateSkills  closeModal={setOpenModal} currentSkills={mentorSkills} updateCurrentSkills={SetMentorSkills} />}
               <h5>Your Skills are:</h5>
             <ol style={{ fontSize:"150%" }}>
                {mentorSkills.map((e)=><li >{e}</li>)}
             </ol>
    <button type="button" className="btn btn-success"  onClick={()=>{
setOpenModal(true);
}}>Update your skills</button>
             </div>
    </TabPanel>
    <TabPanel>
                                                <div className="d3">
                                                <h3>Next Home Work Club : You have no booked session</h3> <h4>Time left: n/a</h4>
                                                <div> <h4>Number of students signed up: N/a</h4></div> <button type="button" className="btn btn-secondary disabled">Join now via Zoom</button>

                                                </div>
    </TabPanel>
    <TabPanel>
    {sessionDetailsModal && <UpcomingSessionDetails  closeDetailsModal={SetSessionDetailsModal} sessionDetail={sessionDetails} />}

         <table className="table">

  <thead>
    <tr>

      <th scope="col">Titel</th>
      <th scope="col">Date and Time</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>

    {/*  {mentorSkills.map((e)=><li >{e}</li>)} */}
    {sessions.map((e)=><tr>
                        <td>{e.club_name}</td>
                        <td>{e.start_date}</td>
                        <td><button type="button" className="btn btn-info" onClick={()=>{
handelClick(e.club_name);
}} >Details</button> <button type="button" className="btn btn-secondary">Sign up</button></td>
                    </tr>)}

  </tbody>
</table>


                                                    </TabPanel>
    <TabPanel><div id="booked-sessions"><h3>booked Sessions</h3>
                                                <h4>HW4 Session 7</h4>
                                                <h6>17/02/2022   18:00 - 21:00</h6>
                                                <button>Details</button>
                                                <button>Cancel</button>

                                                <h4>HW4 Session 8</h4>
                                                <h6>17/02/2022   18:00 - 21:00</h6>
                                                <button>Details</button>
                                                <button>Cancel</button>

                                                <h4>HW4 Session 9</h4>
                                                <h6>17/02/2022   18:00 - 21:00</h6>
                                                <button>Details</button>
                                                <button>Cancel</button>

                                                <h4>HW4 Session 10</h4>
                                                <h6>17/02/2022   18:00 - 21:00</h6>
                                                <button>Details</button>
                                                <button>Cancel</button>
                    </div></TabPanel>
                    <TabPanel></TabPanel>
  </Tabs>

  </div>

    </>

  );

}

