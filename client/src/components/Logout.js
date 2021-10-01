import React from "react";
import { useHistory, Link } from "react-router-dom";

const Logout = () => {
    const history = useHistory();

    const logout = () => {
        history.push("/login");
        localStorage.clear();
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
            <div className="container">
                <Link to="/dashboard" className="nav-link">DashBoard</Link>
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
                            <Link to="/login" href="#login" onClick={logout} className="nav-link">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Logout;
