// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import showcase from "../assets/showcase.svg";
import "./Home.css";
import Footer from "../components/Footer";
export function Home() {
	return (
		<main role="main">
			<Navbar />
			<section className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
				<div className="container">
					<div className="d-sm-flex align-items-center justify-content-between">
						<div>
							<h1>Become a <span className="text-warning"> Web Developer </span></h1>
							<p className="lead my-4">
								We focus on teaching our students the fundamentals of the latest
								and greatest technologies to prepare them for their first dev role
							</p>
							<Link to="/register" className="nav-link">
								<button
									className="btn btn-primary btn-lg"
									data-bs-toggle="modal"
									data-bs-target="#enroll"
								>Start The Enrollment
								</button></Link>
						</div>
						<img
							className="img-fluid w-50 d-none d-sm-block"
							src={showcase}
							alt=""
						/>
					</div>
				</div>
			</section>
			<Footer />
		</main>
	);
}

export default Home;
