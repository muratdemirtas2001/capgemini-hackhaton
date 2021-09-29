// import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import "./Home.css";
import Footer from "../components/Footer";
import Landing from "../components/Landing";
export function Home() {
	return (
		<main role="main">
			<Navbar />
			<Landing />
			<Footer />
		</main>
	);
}

export default Home;
