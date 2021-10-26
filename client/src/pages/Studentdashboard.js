/* eslint-disable jsx-a11y/no-onchange */
import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";
import Footer from "../components/Footer";
import { CSSTransition } from "react-transition-group";
import { now } from "moment";
const moment = require("moment");

export default function Dashboard() {
	const token = localStorage.getItem("users");
	const [isPracticed, setIsPracticed] = useState(false);
	const [users, setUsers] = useState([]);
	const [warning, setWarning] = useState(false);
	const [cancelWarning, setCancelWarning] = useState(false);
	const [upcomingsessions, setUpcomingSessions] = useState();
	const [bookedsessions, setBookedSesions] = useState();
	const [render, setRender] = useState(true);

	const [booksession, setBooksession] = useState({
		club_id: "",
		note: "",
		module_id: "",
	});
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
				setUpcomingSessions(data.upcomingsessions);
				setBookedSesions(data.bookedsessions);
				setIsPracticed(true);
			});
	}, [token, render]);

	const handlesubmit = (e) => {
		e.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(booksession),
		};
		fetch("/api/booksession", requestOptions)
			.then((response) => response.json())
			.then(() => {
				console.log("hello book session");
				setRender(!render);
				setWarning(true);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
		setBooksession({
			club_id: "",
			note: "",
			module_id: "",
		});
	};

	const handleCancel = (e) => {
		e.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ club_id: e.target.id }),
		};

		fetch("/api/cancelbooking", requestOptions)
			.then((response) => response.json())
			.then(() => {
				setRender(!render);
				setCancelWarning(true);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleJoin = (e) => {
		e.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ club_id: e.target.id }),
		};

		fetch("/api/updateattendance", requestOptions)
			.then((response) => response.json())
			.then(() => {
				// setRender(!render);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
		const link = users.zoom_link;
		window.open(link, "_blank");
	};

	const handlebooking = (e) => {
		const newBooking = { ...booksession, [e.target.name]: e.target.value };
		setBooksession(newBooking);
	};

	const joinsession = (e) => {
		e.preventDefault();
		console.log(e.target.id);
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ club_id: e.target.id }),
		};

		fetch("/api/updateattendance", requestOptions)
			.then((response) => response.json())
			.then(() => {
				setRender(!render);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
		const link = users.zoom_link;
		window.open(link, "_blank");
	};

	console.log(isPracticed ? users : "loading users");
	console.log(
		isPracticed ? upcomingsessions[0].club_id : "loading booksession"
	);
	console.log(booksession);


	return (
		<>
			{isPracticed ? (
				<div className="position-relative studentbackground">
					<Logout />
					<CSSTransition
						in={warning}
						timeout={3000}
						classNames="alert"
						unmountOnExit
						onEnter={() => setWarning(false)}
					>
						<div className="col-lg-6 col-md-6 col-sm-7 offset-sm-2 text-center bg-success m-3 position-absolute top-20 start-50 translate-middle  rounded-bottom">
							<h4 className="mt-3">Session has been succesfully booked.</h4>
						</div>
					</CSSTransition>
					<CSSTransition
						in={cancelWarning}
						timeout={3000}
						classNames="alert"
						unmountOnExit
						onEnter={() => setCancelWarning(false)}
					>
						<div className="col-lg-6 col-md-6 col-sm-7 offset-sm-2  text-center bg-success m-3 position-absolute top-20 start-50 translate-middle  rounded-bottom">
							<h4 className="mt-3">Session has been succesfully Cancelled.</h4>
						</div>
					</CSSTransition>
					<section>
						<div className="px-3 overflow-hidden">
							<div className="row p-2 m-2">
								<div className="col-10">
									<div>
										<p>
											Welcome {users.firstname} {users.lastname}{" "}
										</p>
										<span>{users.cohort} - </span>
										<span>
											{users.usertype.charAt(0).toUpperCase() +
												users.usertype.slice(1)}{" "}
										</span>
									</div>
								</div>
							</div>
							<div className="row gx-5">
								{/* left side of the grid */}
								<div className="col-lg-4 col-md-4 col-sm-4  text-center p-3">
									<h2>Booked Session</h2>
									{bookedsessions.map((session, index) => {
										const {
											club_id,
											club_name,
											date,
											start_time,
											end_time,
											starttime_in_full,
										} = session;
										let timedifference=(starttime_in_full - moment().unix())/3600>2;


										return (
											<form onSubmit={handleCancel} key={index}>
												<div className="d-flex row row gy-3 p-3 mt-2 align-items-center text-center">
													<div className="d-flex flex-row justify-content-between">
														<div className="d-flex flex-column">
															<span>{club_name}</span>
															<span>Date : {date}</span>
															<span>
																Time : {start_time}-{end_time}
															</span>
														</div>
														<div>
															<button
																className={
																	timedifference
																		? "btn btn-info p-3"
																		: "btn btn-primary p-3"
																}
																id={club_id}
																type="submit"
																onClick={handleJoin}
																disabled={timedifference ? true : false}
															>
																Join the lesson
															</button>
															<button
																className="btn btn-danger p-3"
																id={club_id}
																type="submit"
																onClick={handleCancel}
															>
																Cancel
															</button>
														</div>
													</div>
												</div>
											</form>
										);
									})}
								</div>
								{/* right side of the grid */}
								<div className="col-lg-8 col-md-8 col-sm-8">
									<div className="row">
										<div className="col text-center ">
											<h2>Sessions to register</h2>
										</div>
									</div>
									{upcomingsessions.map((session, index) => {
										const { club_id, club_name, date, start_time, end_time } =
											session;
										return (
											<form onSubmit={handlesubmit} key={index}>
												<div className="row row gy-3 p-3 mt-2 align-items-center text-center ">
													<div className="col-sm-12 col-md-12 col-lg-3  d-flex flex-column">
														<>
															<span>{club_name}</span>
															<span>Date : {date}</span>
															<span>
																Time : {start_time}-{end_time}
															</span>
														</>
													</div>
													<div className="col-sm-12 col-md-12 col-lg-4">
														<select
															onChange={handlebooking}
															className="form-select form-control"
															aria-label="select example"
															name="module_id"
														>
															<option>Topic Choice</option>
															{users.topics.map((topic, index) => {
																// let value = `${topic.module_name} - week ${topic.week}`;
																return (
																	<option value={index + 1} key={index}>
																		{topic.module_name} - week {topic.week}
																	</option>
																);
															})}
														</select>
													</div>
													<div className="col-sm-12 col-md-12 col-lg-3 text-center">
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
															></textarea>
														</label>
													</div>
													<div className="col-sm-12 col-md-12 col-lg-2">
														<button
															className="btn btn-primary"
															type="submit"
															onClick={() => (booksession.club_id = club_id)}
														>
															Register
														</button>
													</div>
												</div>
											</form>
										);
									})}
								</div>
							</div>
						</div>
					</section>
					<Footer />
				</div>
			) : null}
		</>
	);
}
