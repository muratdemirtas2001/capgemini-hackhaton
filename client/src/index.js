import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import { AppProvider } from "../Context";


ReactDOM.render(
	<React.StrictMode>
		<Router>
			<AppProvider>
				<App />
			</AppProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
