/* eslint-disable jsx-a11y/no-onchange */
import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";
import Footer from "../components/Footer";
import { CSSTransition } from "react-transition-group";
export default function Dashboard() {
	const token = localStorage.getItem("users");
	const [isPracticed, setIsPracticed] = useState(false);
	const [users, setUsers] = useState([]);
	const [warning, setWarning] = useState(false);
	const [booksession, setBooksession] = useState(
		{
			"club_id": "",
			"note": "",
			"module_id": "",

		}
	);

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
				setIsPracticed(true);
			});

			fetch("/api/booksession", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if(data){
						setBooksession(data);
						setIsPracticed(true);
					}else{
						console.log("booksession has not been uploaded");
					}
				});



	}, [token]);

	const handlesubmit = (e) => {
		e.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(booksession),
		};
		fetch("/api/booksession", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setWarning(true);
				setBooksession(booksession.concat(data));
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handlebooking = (e) => {
		const newBooking = { ...booksession, [e.target.name]: e.target.value };
		setBooksession(newBooking);
	};

	console.log(isPracticed ? users : "loading users");
	console.log(isPracticed ? booksession : "loading booksession");
	console.log(booksession);
	return (
		<>
			{isPracticed ?
				<div className="position-relative">
					<Logout />
					<CSSTransition
						in={warning}
						timeout={2000}
						classNames="alert"
						unmountOnExit
						onEnter={() => setWarning(false)}
					>
						<div className="col-lg-6 col-md-6 col-sm-7 offset-sm-2 text-white text-center bg-success m-3 position-absolute top-20 start-50 translate-middle border rounded-bottom">
							<h4 className="mt-3">Session has been succesfully booked.</h4>
						</div>
					</CSSTransition>
					<section>
						<div className="px-3 overflow-hidden bg-dark">
							<div className="row p-2 m-2">
								<div className="col-10 text-white">
									<div>
										<p>Welcome {users.firstname} {users.lastname} </p>
										<span>{users.cohort} - </span>
										<span>{users.usertype.charAt(0).toUpperCase() + users.usertype.slice(1)} </span>
									</div>
								</div>
								<div className="col-2">
									<button className="btn btn-success pr-3"><a href={users.zoom_link} target="_blank" rel="noreferrer">Join</a> </button>
								</div>
							</div>
							<div className="row gx-5">
								{/* left side of the grid */}
								<div className="col-lg-4 col-md-4 col-sm-4 text-white text-center p-3">
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
								<div className="col-lg-8 col-md-8 col-sm-8">
									<div className="row">
										<div className="col text-white text-center ">
											<h2>Upcoming session</h2>
										</div>
									</div>
									<form onSubmit={handlesubmit}>
										<div className="row row gy-3 p-3 mt-2 align-items-center text-center">
											<div className="col-sm-12 col-md-12 col-lg-3 text-white d-flex flex-column">
												<span>HW Session 6</span>
												<span>Date : 04/10/2021 </span>
												<span>Time :17:00 - 19:00</span>
											</div>
											<div className="col-sm-12 col-md-12 col-lg-4">
												<select  onChange={handlebooking} className="form-select form-control" aria-label="select example" name="module_id">
													<option>Topic Choice</option>
													{users.topics.map((topic, index) => {
														// let value = `${topic.module_name} - week ${topic.week}`;
														return (
															<option
																value={index + 1}
																key={index}>{topic.module_name} - week {topic.week}
															</option>
														);
													})}
												</select>
											</div>
											<div className="col-sm-12 col-md-12 col-lg-3 text-white text-center" >
												<label htmlFor="note">
													<textarea
														id="note"
														className="form-control"
														name="note"
														rows="5"
														cols="70"
														placeholder="please give us some information about your question(s)."
														minLength="20"
														onChange={handlebooking}
														required
													>
													</textarea></label>
											</div>
											<div className="col-sm-12 col-md-12 col-lg-2  border-white ">
												<button className="btn btn-primary" type="submit">Register</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</section>
					<Footer />
				</div>
				: null}
		</>
	);
}
