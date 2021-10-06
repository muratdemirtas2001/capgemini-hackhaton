import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";

export default function Dashboard() {
	const token = localStorage.getItem("users");

	// console.log("TOKEN IN DASHBOARD IS",token);
	const [isPracticed, setIsPracticed] = useState(false);
	const [users, setUsers] = useState([]);
	console.log("is practiced", isPracticed);
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
				console.log("sdsd", data);
				setUsers(data);
				setIsPracticed(true);
			});
	}, [token]);

	console.log("TOKEN IN DASHBOARD IS", token);
	console.log(isPracticed ? users[0].firstname : "hello world");
	const handlesubmit = () => {
		return "hello world!";
	};
	return (
		<>
			<Logout />
			<div className="container-md mt-2 px-3 overflow-hidden">
				<div className="row p-2 m-2">
					<div className="col-9 text-white">
						{isPracticed ? <div>
							<p>Welcome {users[0].firstname} {users[0].lastname} </p>
							<span>{users[0].cohort} - </span>
							<span>17:00 - 19:00 </span>
							<span> 01/10/2021</span>
						</div> : null}
					</div>
					<div className="col-3">
						<button className="btn btn-danger pl-3">Join now</button>
					</div>
				</div>

				<div className="row gx-5">
					{/* left side of the grid */}
					<div className="col-lg-4 col-md-4 col-sm-4 border border-white text-white p-3">
						<h1>Booked Session</h1>
						<div>
							<h3>HW Session 7 ARRAYS</h3>
							<h4>04/10/2021  17:00 - 19:00</h4>
							<p>notes: loren impsum  loren impsum loren impsum loren
								impsum loren impsum loren impsum loren impsum loren
								impsum loren impsum loren impsum loren impsum</p>
						</div>
						<div className="d-flex justify-content-between">
							<button className="btn btn-warning pr-3">Edit</button>
							<button className="btn btn-danger pr-3">Cancel</button>
						</div>
					</div>
					{/* right side of the grid */}
					<div className="col-lg-8 col-md-8 col-sm-8 border border-white">
						<div className="row">
							<div className="col border-white text-white text-center ">
								<h2>Upcoming session</h2>
							</div>
						</div>
						<form onSubmit={handlesubmit}>
							<div className="row row gy-3 p-3 mt-2 border align-items-center text-center">
								<div className="col-sm-12 col-md-12 col-lg-3 border-white text-white d-flex flex-column">
									<span>HW Session 6</span>
									<span>Date : 04/10/2021 </span>
									<span>Time :17:00 - 19:00</span>
								</div>
								<div className=" col-sm-12 col-md-12 col-lg-3 ">
									<select>
										<option defaultChecked>Topic Choice</option>
										<option value="javascript1">javascript core 1</option>
										<option value="javascript2">javascript core 2</option>
									</select>
								</div>
								<div className="col-sm-12 col-md-12 col-lg-3  text-white " >
									<label htmlFor="question">
										<textarea id="question" name="question" cols="20" rows="5"
											placeholder="please give us some information about your question.">
										</textarea></label>
								</div>
								<div className="col-sm-12 col-md-12 col-lg-3  border-white ">
									<button className="btn btn-primary">Register</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
