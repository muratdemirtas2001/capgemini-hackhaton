import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";

export default function Dashboard() {
    const token = localStorage.getItem("users");
	console.log(token);
    const [isPracticed, setIsPracticed] = useState(false);
	// const [users, setUsers] = useState([]);
    // console.log("users", users);
	console.log("is practiced", isPracticed);
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
				if (data.error) {
					setIsPracticed(true);
				}
			});

			// fetch("/api/login")
            // .then((res) => {
            //     if (!res.ok) {
            //         throw new Error(res.statusText);
            //     }
            //     return res.json();
            // })
            // .then((body) => {
            //     setUsers(body);
            // })
            // .catch((err) => {
            //     console.error(err);
            // });
	}, [token]);


    return (
        <>
        <Logout />
        </>
    );
}
