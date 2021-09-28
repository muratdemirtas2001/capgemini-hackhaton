import React, { useState } from "react";
import { useGlobalContext } from "../../Context";
export default function Register() {
    const { registedPeople } = useGlobalContext();

    const [signup, setSignUp] = useState({
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
            body: JSON.stringify(signup),
        };
        fetch("/api/signup", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setSignUp(registedPeople.concat(data));
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        setSignUp({
            "firstname": "",
            "lastname": "",
            "email": "",
            "password": "",
            "cohort": "",
            "usertype": "",
        });
    };

    const handleSignUp = (e) => {
        const newRegistration = { ...signup, [e.target.name]: e.target.value };
        setSignUp(newRegistration);
    };
    return (
        <div className="justify-content-center align-bottom d-flex flex-wrap  bg-primary">
            <form onSubmit={handleSubmit}>
                <div className="input-group input-group-sm mb-3">
                    <label htmlFor="firstname" >
                        FirstName:
                        <input type="text" name="firstname" id="firstname" placeholder="FirstName" value={signup.firstname} onChange={handleSignUp} />
                    </label>
                </div>
                <div className="input-group input-group-sm mb-3">
                    <label htmlFor="lastname" >
                        LastName:
                        <input type="text" name="lastname" id="lastname" placeholder="LastName" value={signup.lastname} onChange={handleSignUp} />
                    </label>
                </div>

                <div className="input-group input-group-sm mb-3">
                    <label htmlFor="email" >
                        E-mail:
                        <input type="email" name="email" id="email" placeholder="E-mail" value={signup.email} onChange={handleSignUp} />
                    </label>
                </div>

                <div className="input-group input-group-sm mb-3">
                    <label htmlFor="password" >
                        Password:
                        <input type="password" name="password" id="password" placeholder="Password" value={signup.password} onChange={handleSignUp} />
                    </label>

                </div>

                <div className="input-group input-group-sm mb-3">
                    <select onBlur={handleSignUp} className="form-select" aria-label="select example" name="cohort" >
                        <option defaultValue>What is your cohort ?</option>
                        <option value="London-8">London-8</option>
                        <option value="London-9">London-9</option>
                        <option value="London-10">London-10</option>
                    </select>
                </div>

                <div className="input-group input-group-sm mb-3">
                    <select onBlur={handleSignUp} className="form-select" aria-label="select example" name="usertype">
                        <option defaultValue>Usertype ?</option>
                        <option value="student" >student</option>
                        <option value="mentor" >mentor</option>
                    </select>
                </div>

                <input className="btn btn-secondary" type="submit" value="SignUp" />
            </form>
        </div>
    );
}


