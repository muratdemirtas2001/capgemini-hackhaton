import React from "react";
import { Link } from "react-router-dom";
// import logo from "../pages/logo.svg";
export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
				<div className="container">
                {/* <img
					className="logo"
					data-qa="logo"
					src={logo}
					alt="Just the React logo"
				/> */}
					<Link to="/" className="nav-link">HOME</Link>

					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navmenu"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navmenu">
						<ul className="navbar-nav ms-auto">
							<li className="nav-item">
								<Link to="/register" className="nav-link">Register</Link>
							</li>
							<li className="nav-item">
								<Link to="/login" className="nav-link">Login</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
    );
}
