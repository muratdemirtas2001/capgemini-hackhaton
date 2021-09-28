import React, { useState } from "react";
import { useGlobalContext } from "../../Context";
export default function Login() {
    const { loginPerson } = useGlobalContext();
    const [login, setLogin] = useState({
        "email": "",
        "password": "",
    });
    const handleLogin = (e) => {
        const newRegistration = { ...Login, [e.target.name]: e.target.value };
        setLogin(newRegistration);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(login),
        };
        fetch("/api/login", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setLogin(loginPerson.concat(data));
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        setLogin({
            "email": "",
            "password": "",
        });
    };
    return (
        <div className="justify-content-center align-bottom d-flex flex-wrap  bg-primary p-3">
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
                            onChange={handleLogin} />
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
                            required />
                    </label>
                </div>
                <input
                    className="btn btn-secondary"
                    type="submit"
                    value="login" />
            </form>
        </div>
    );
}

