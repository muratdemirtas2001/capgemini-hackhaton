import React from "react";
import { Nav, Container, Navbar } from "react-bootstrap";
export default function Navbarcomponent() {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
		<Container>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link href="#home" to="/" className="nav-link">HOME</Nav.Link>
				</Nav>
				<Nav>
					<Nav.Link href="#register" to="/register" className="nav-link" >Register</Nav.Link>
				</Nav>
				<Nav>
					<Nav.Link href="#login" to="/login" className="nav-link" >Login</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
	);
}
