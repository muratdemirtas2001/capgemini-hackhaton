import React, { useState } from "react";
import { useGlobalContext } from "../../Context";
export default function Register() {
    const { registedPeople } = useGlobalContext();

    const [login, setLogin] = useState({
        "firstname": "",
        "lastname": "",
        "email": "",
        "password": "",
        "cohort": "",
        "usertype": "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(login),
        };
        fetch("/api/questions", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setLogin(registedPeople.concat(data));
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        setLogin({
            "firstname": "",
            "lastname": "",
            "email": "",
            "password": "",
            "cohort": "",
            "usertype": "",
        });
    };

    const handleSignUp = (e) => {
        const newRegistration = { ...login, [e.target.name]: e.target.value };
        setLogin(newRegistration);
    };
    return (
        <div className="justify-content-center p-3 d-flex flex-wrap align-items-center bg-primary">
            <form onSubmit={handleSubmit}>
                <div className="col-6 col-md-5 col-lg-3">
                    <label htmlFor="firstname" >
                        FirstName:
                        <input type="text" name="firstname" id="firstname" placeholder="FirstName" value={login.firstname} onChange={handleSignUp} />
                    </label>
                </div>
                <div className="col-6 col-md-5 col-lg-3">
                    <label htmlFor="lastname" >
                        LastName:
                        <input type="text" name="lastname" id="lastname" placeholder="LastName" value={login.lastname} onChange={handleSignUp} />
                    </label>
                </div>

                <div className="col-6 col-md-5 col-lg-3">
                    <label htmlFor="email" >
                        E-mail:
                        <input type="email" name="email" id="email" placeholder="E-mail" value={login.email} onChange={handleSignUp} />
                    </label>
                </div>

                <div className="col-6 col-md-5 col-lg-3">
                    <label htmlFor="password" >
                        Password:
                        <input type="password" name="password" id="password" placeholder="Password" value={login.password} onChange={handleSignUp} />
                    </label>

                </div>

                <div className="col-12 col-md-5 col-lg-12">
                    <select onBlur={handleSignUp} className="form-select" aria-label="select example" name="cohort" >
                        <option defaultValue>What is your cohort ?</option>
                        <option value="London-8">London-8</option>
                        <option value="London-9">London-9</option>
                        <option value="London-10">London-10</option>
                    </select>
                </div>

                <div className="col-6 col-md-5 col-lg-12">
                    <select onBlur={handleSignUp} className="form-select" aria-label="select example" name="usertype">
                        <option defaultValue>Usertype ?</option>
                        <option value="student" >student</option>
                        <option value="mentor" >mentor</option>
                    </select>
                </div>

                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
}


