import React from "react";
import { Link } from "react-router-dom";
import { Nav, Container, Navbar } from "react-bootstrap";
export default function Navbarcomponent() {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
		<Container>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link href="#profile"><Link to="/" className="nav-link">HOME</Link></Nav.Link>
				</Nav>
				<Nav>
					<Nav.Link href="#login"><Link to="/register" href="#register" className="nav-link">Register</Link></Nav.Link>
				</Nav>
				<Nav>
					<Nav.Link href="#login"><Link to="/login" href="#login" className="nav-link" >Login</Link></Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
	);
}
