import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => (
	<Switch>
		<Route path="/" exact>
			<Home />
		</Route>
		<Route path="/about/this/site">
			<About />
		</Route>
		<Route>
			<Register path="/register" />
		</Route>
		<Route>
			<Login path="/login" />
		</Route>
	</Switch>
);

export default App;
