/* eslint-disable jsx-a11y/no-onchange */
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../Context";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Footer from "./Footer";
import Navbarcomponent from "./Navbarcomponent";

export default function Register() {
    const { registedPeople, setRegisteredPeople } = useGlobalContext();
    const [warning, setWarning] = useState(false);
    const [error, setError] = useState("");
    const [cohort, setCohort] = useState([]);
    let history = useHistory();
    const [signup, setSignUp] = useState({
        "firstname": "",
        "lastname": "",
        "email": "",
        "password": "",
        "passwordCheck": "",
        "cohort": "",
        "usertype": "",
    });

    useEffect(() => {
        fetch("/api/cohorts")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((body) => {
                setCohort(body);
            })
            .catch((err) => {
                console.error(err);
            });
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let regValue = /(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(.{8,})/;
        const { firstname, lastname, passwordCheck, password, cohort, usertype, email } = signup;
        // Validation
        if (!email && !password) {
            setWarning(true);
            setError("The fields cannot be empty");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setWarning(true);
            setError("Email address is invalid");
        } else if (!password) {
            setWarning(true);
            setError("Password is required");
        } else if (password !== passwordCheck) {
            setWarning(true);
            setError("Passwords must match");
        } else if (!regValue.test(password)) {
            setWarning(true);
            setError("Passwords must contain a number, a capital letter and  at least 8 characters");
        } else {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signup),
            };
            fetch("/api/signup", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.register === "success") {
                        localStorage.setItem("users", requestOptions);
                        setRegisteredPeople(registedPeople.concat(data));
                        history.push("/dashboard");
                    } else if (data.register === "error" || data.register === "error-registereduser") {
                        setError("User already exists");
                        setWarning(true);
                        history.push("/register");
                    }
                }).catch((error) => {
                    console.error("Error:", error);
                });
        }
        setSignUp({
            "firstname": firstname ? firstname : "",
            "lastname": lastname ? lastname : "",
            "email": email ? email : "",
            "password": password ? password : "",
            "cohort": cohort ? cohort : "",
            "usertype": usertype ? usertype : "",
            "passwordCheck": passwordCheck ? passwordCheck : "",
        });
    };
    const handleSignUp = (e) => {
        const newRegistration = { ...signup, [e.target.name]: e.target.value };
        setSignUp(newRegistration);
        const { firstname, lastname, passwordCheck, password, cohort, usertype } = signup;
        if (firstname || lastname || password || passwordCheck || cohort || usertype) {
            setWarning(false);
        }
    };

    return (
        <section>
            <Navbarcomponent />
            <div className="justify-content-center bg-dark p-3 text-white">
                <fieldset className="justify-content-center align-center d-flex flex-wrap bg-dark p-1">
                    {warning ? <div className=" justify-content-center align-center  p-3 mb-2 bg-danger text-center  text-white">{error}</div> : null}
                    <legend className="col-12 text-center">Homework Club Sign Up</legend>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group input-group-md mb-3">
                            <label htmlFor="firstname" className="form-label" >
                                FirstName:
                                <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    placeholder="FirstName"
                                    value={signup.firstname}
                                    onChange={handleSignUp}
                                    className="form-control form-control-md"
                                />
                            </label>
                        </div>
                        <div className="input-group input-group-md mb-3">
                            <label htmlFor="lastname">
                                LastName:
                                <input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    placeholder="LastName"
                                    value={signup.lastname}
                                    onChange={handleSignUp}
                                    className="form-control form-control-md" />
                            </label>
                        </div>

                        <div className="input-group input-group-md mb-3">
                            <label htmlFor="email"  >
                                E-mail:
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="name@example.com"
                                    value={signup.email}
                                    onChange={handleSignUp}
                                    className="form-control form-control-md" />
                            </label>
                        </div>

                        <div className="input-group input-group-md mb-3">
                            <label htmlFor="password" className="form-label" >
                                Password:
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={signup.password}
                                    onChange={handleSignUp}
                                    className="form-control form-control-md"
                                />
                            </label>
                        </div>
                        <div className="input-group input-group-md mb-3">
                            <label htmlFor="passwordcheck" className="form-label" >
                                Confirm Your Password:
                                <input
                                    type="password"
                                    name="passwordCheck"
                                    id="passwordCheck"
                                    placeholder="confirm Password"
                                    value={signup.passwordCheck}
                                    onChange={handleSignUp}
                                    className="form-control form-control-md"
                                />
                            </label>
                        </div>
                        <div className="input-group input-group-md mb-3">
                            <select value={signup.usertype} onChange={handleSignUp} className="form-select" aria-label="select example" name="usertype">
                                <option>User Type ?</option>
                                <option value="student" >student</option>
                                <option value="mentor" >mentor</option>
                            </select>
                        </div>
                        {signup.usertype === "student" ?
                            <div className="input-group input-group-md mb-3">
                                <select value={signup.usertype} onChange={handleSignUp} className="form-select" aria-label="select example" name="cohort" >
                                    <option>What is your cohort ?</option>
                                    {cohort.map((element, index) => {
                                        return (
                                            <option value="London-8" key={index}>{element}</option>
                                        );
                                    })
                                    }
                                </select>
                            </div> : null}

                        <input
                            className="btn btn-primary form-control form-control-lg"
                            type="submit"
                            value="Sign Up" />
                    </form>
                </fieldset>
                <div className="d-flex justify-content-center text-center mt-3 ">
                    <p>Already have an account?</p>
                    <Link to="/login" style={{ listStyle: "none", textDecoration: "none", marginLeft: "10px" }}>Log In</Link>
                </div>
                <Footer />
            </div>
        </section>
    );
}


