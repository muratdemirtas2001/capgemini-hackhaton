import React, { useState } from "react";
import { useGlobalContext } from "../../Context";
export default function Login() {
    const [login, setLogin] = useState({
        "email": "",
        "password": "",
    });
    const { loginPerson } = useGlobalContext();


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
        <div className="">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" >
                        E-mail:
                        <input type="email" name="email" id="email" placeholder="E-mail" />
                    </label>
                </div>
                <div>
                    <label htmlFor="password" >
                        Password:
                        <input type="password" name="password" id="password" placeholder="Password" required />
                    </label>
                </div>
                <input className="btn btn-secondary" type="submit" value="login" />
            </form>
        </div>
    );
}

