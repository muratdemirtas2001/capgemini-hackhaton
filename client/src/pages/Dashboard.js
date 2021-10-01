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
				if (data.error) {
					setIsPracticed(true);
				}
			});
	}, [token]);


    return (
        <>
        <Logout />
        </>
    );
}
