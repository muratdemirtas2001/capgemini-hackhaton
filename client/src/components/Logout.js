import React from "react";
import { useHistory, NavLink } from "react-router-dom";

const Logout = () => {
    const history = useHistory();

    const login = () => {
        history.push("/login");
        localStorage.clear();
    };

    return (
        <div>
            <NavLink to="/login" onClick={login} id="log-out">
                Log Out
            </NavLink>
        </div>
    );
};

export default Logout;
