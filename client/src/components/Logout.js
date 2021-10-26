import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
const Logout = () => {
    const history = useHistory();

    const logout = () => {
        history.push("/login");
        localStorage.clear();
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="" variant="dark">
            <Container>
                {/* <Navbar.Brand href="#home">Welcome to Homework Club</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link><Link to="/dashboard" className="nav-link">DashBoard</Link></Nav.Link> */}
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={logout} to="/login" className="nav-link text-dark">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Logout;
