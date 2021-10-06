// import { useEffect, useState } from "react";

import Navbarcomponent from "../components/Navbarcomponent";
import "./Home.css";
import Footer from "../components/Footer";
import Landing from "../components/Landing";
export function Home() {
	return (
		<main role="main">
			<Navbarcomponent />
			<Landing />
			<Footer />
		</main>
	);
}

export default Home;
