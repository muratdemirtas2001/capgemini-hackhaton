
import React, { useEffect, useState } from "react";

import Logout from "../components/Logout";
import "./Mentordashboard.css";

const token = localStorage.getItem("users");
console.log(token);


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

	 function updateSkills  ()  {

	}




    return (
        <>


            <Logout />
            <div id="container">
                <div className="d1"><h3>Welcome : You are logged in as volunteer {fullName}</h3>
             <ol>
                 <li>HTML</li>
                 <li>CSS</li>
                 <li>javaScript</li>
                 <li>React</li>
             </ol>
                <button type="button" className="btn btn-success" onClick={updateSkills}>Update your skills</button>

                    </div>


  <div className="d2"><h3>booked Sessions</h3>
                                                <h4>HW4 Session 7</h4>
                                                <h6>17/02/2022   18:00 - 21:00</h6>
                                                <button type="button" className="btn btn-info">Details</button>
                                                <button type="button" className="btn btn-danger">Cancel</button>

                                                <h4>HW4 Session 8</h4>
                                                <h6>17/02/2022   18:00 - 21:00</h6>
                                                <button type="button" className="btn btn-info">Details</button>
                                                <button type="button" className="btn btn-danger">Cancel</button>

                                                <h4>HW4 Session 9</h4>
                                                <h6>17/02/2022   18:00 - 21:00</h6>
                                                <button type="button" className="btn btn-info">Details</button>
                                                <button type="button" className="btn btn-danger">Cancel</button>

                                                <h4>HW4 Session 10</h4>
                                                <h6>17/02/2022   18:00 - 21:00</h6>
                                                <button type="button" className="btn btn-info">Details</button>
                                                <button type="button" className="btn btn-danger">Cancel</button></div>

                                                <div className="d3">
                                                <h3>Next Home Work Club : Session 5      17:00-19:00   01/10/2021</h3> <h4>Time left: 3 Days 09 Hours 16 minuts</h4>
                                                <div> <h4>Number of students signed up: 15</h4></div> <button type="button" className="btn btn-secondary">Join now via Zoom</button>
                                                
                                                </div>
  <div className="d4"><h3>Upcoming Session</h3>
                                                    <h4>HW4 Session 6</h4>
                                                    <h6>17/02/2022   18:00 - 21:00</h6>
                                                    <div><h4>Topic:</h4><h5>React</h5></div>
                                                    <h4> link to CYF syllabus:</h4><h5>https://syllabus.codeyourfuture.io/react/week-1/homework</h5>
                                                    </div>

</div>

        </>
    );
}

/*
 <div>
                <h1>I am Mentor dashboard</h1>
                <div id="container">
                    <div id="volunteer-header"><h3>HW Session 5      17:00-19:00   01/10/2021</h3> <h6>Time left: 3 Days 09 Hours 16 minuts</h6> <button>Join now via Zoom</button></div>
                    <div id="volunteer-info"><h5>You are logged in as volunteer : John smith</h5>
                    <h6>Your Skills are:</h6><ul><li>HTML</li><li>HTML</li><li>css</li><li>javaScript</li></ul><button>Update your skills</button>
                    </div>
                    <div id="booked-sessions"><h3>booked Sessions</h3>
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
                    </div>
                    <div id="upcoming-session-info"><h3>Upcoming Session</h3>
                                                    <h4>HW4 Session 6</h4>
                                                    <h6>17/02/2022   18:00 - 21:00</h6>
                                                    <div><h4>Topic:</h4><h5>React</h5></div>
                                                    <h4> link to CYF syllabus:</h4><h5>https://syllabus.codeyourfuture.io/react/week-1/homework</h5>
                                                    <div> <h4>Number of students signed up:</h4><h5>15</h5></div>

                    </div>
                </div>
            </div>

               <table className="table">
                    <thead>
               <tr>
                        <th scope="col">Your Skills </th></tr>

                        </thead>

                        <tbody>
                        <tr  >
                            <td>HTML</td><td>CSS</td><td>javaScript</td><td>React</td>
                        </tr>

                        </tbody>
                </table>

*/
