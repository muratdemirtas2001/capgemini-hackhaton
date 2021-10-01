import React, { useState } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import { useGlobalContext } from "../../Context";
import Navbar from "./Navbar";
export default function Login() {
    let history = useHistory();
    // const { loginPerson } = useGlobalContext();
    const [error, setError] = useState("");
    const [warning, setWarning] = useState(false);
    const [login, setLogin] = useState({
        "email": "",
        "password": "",
    });
    const handleLogin = (e) => {
        const newRegistration = { ...login, [e.target.name]: e.target.value };
        if (login.email && login.password) {
            setError("");
            setWarning(false);
        }
        setLogin(newRegistration);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!login.email && !login.password) {
            setWarning(true);
            setError("The fields cannot be empty");
        } else if (!login.email) {
            setWarning(true);
            setError("Please enter an email");
        } else if (!login.password) {
            setWarning(true);
            setError("Please enter a password");
        } else {
            // I am not sure how we are going to match with the password in our database.
            let result = fetch("/api/signin", {
                method: "POST",
                body: JSON.stringify(login),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.token);
                    if (data.auth === "success") {
                        console.log(data);
                        history.push("/dashboard");
                    } else if (data.auth === "error") {
                        console.log(data);

                        setError(data.errors.email);

                        history.push("/login");
                    }

                    localStorage.setItem("users", data.token);
                });

            localStorage.setItem("users", result);
        }

        setLogin({
            "email": login.email ? login.email : "",
            "password": login.password ? login.password : "",
        });
    };
    return (
        <div>
            <Navbar />
            <section className="bg-dark text-light p-5 pt-lg-5 text-center text-sm-start">
                <div className="container">
                    <fieldset className="align-items-center ">
                        <div className="justify-content-center align-center d-flex flex-wrap bg-dark p-3">
                            <legend className="col-12 text-center" >Homework Club Login</legend>
                            {warning ? <div className="p-3 mb-2 bg-danger text-white">{error}</div> : null}
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="form-label" >
                                        E-mail:
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="name@example.com"
                                            value={login.email}
                                            onChange={handleLogin}
                                            className="form-control form-control-lg" />
                                    </label>
                                </div>
                                <div>
                                    <label htmlFor="password" className="form-label" >
                                        Password:
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                            onChange={handleLogin}
                                            value={login.password}
                                            className="form-control form-control-lg"
                                        />
                                    </label>
                                </div>
                                <input
                                    className="btn btn-primary form-control form-control-lg"
                                    type="submit"
                                    value="Login"
                                />
                            </form>
                        </div>
                    </fieldset>
                </div>
                <div className="d-flex justify-content-center text-center mt-3 ">
                    <p>Need an account?</p>
                    <Link to="/register" style={{ listStyle: "none", textDecoration: "none", marginLeft: "10px" }}>Sign Up</Link>
                </div>
            </section>
            <Footer />
        </div>
    );
}

