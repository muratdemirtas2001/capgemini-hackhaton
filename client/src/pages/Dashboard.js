import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";

export default function Dashboard() {
    const token = localStorage.getItem("users");
	// console.log("TOKEN IN DASHBOARD IS",token);
    const [isPracticed, setIsPracticed] = useState(false);
    console.log(isPracticed);
    useEffect(() => {
		fetch("/api/dashboard", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.error) {
					setIsPracticed(true);
				}
			});
	}, [token]);
	console.log("TOKEN IN DASHBOARD IS", token);


    return (
        <>
        <Logout />
        </>
    );
}
