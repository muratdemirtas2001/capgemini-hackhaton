import React, { useState } from "react";
// import { useGlobalContext } from "../../Context";
import Navbar from "./Navbar";
export default function Login() {
    // const { loginPerson } = useGlobalContext();
    const [login, setLogin] = useState({
        "email": "",
        "password": "",
    });
    const [warning, setWarning] = useState(false);
    const handleLogin = (e) => {
        const newRegistration = { ...login, [e.target.name]: e.target.value };
        setLogin(newRegistration);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!login.email || !login.password) {
            setWarning(true);
        } else {
            // I am not sure how we are going to match with the password in our database.
            // const requestOptions = {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(login),
            // };
            // fetch("/api/login", requestOptions)
            //     .then((response) => response.json())
            //     .then((data) => {
            //         setLogin(loginPerson.concat(data));
            //     })
            //     .catch((error) => {
            //         console.error("Error:", error);
            //     });
        }

        setLogin({
            "email": "",
            "password": "",
        });
    };
    return (
        <div>
            <Navbar />
            <div className="row justify-content-center">
                <fieldset>
                    <legend>Homework Club Login</legend>
                    <div className="col-6 col-md-5 col-lg-3">
                        {warning ? <div className="p-3 mb-2 bg-danger text-white"> *Please make sure you write your email and password.</div> : null}
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
                                        required
                                        className="form-control form-control-lg" />
                                </label>
                            </div>
                            <input
                                className="btn btn-secondary"
                                type="submit"
                                value="Login"
                            />
                        </form>
                    </div>
                </fieldset>
            </div>
        </div>
    );
}

