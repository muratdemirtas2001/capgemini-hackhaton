import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";

export default function Dashboard() {
    const token = localStorage.getItem("users");
    const [isPracticed, setIsPracticed] = useState(false);
    console.log(isPracticed);
    useEffect(() => {
		fetch("/api/practise", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
	console.log("use eff is practice test:");
	console.log(data);
				if (data.error) {
					setIsPracticed(true);
				}
			});
	}, [token]);


    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
			<div className="container">
            <Logout />
            </div>
		</nav>
    );
}
