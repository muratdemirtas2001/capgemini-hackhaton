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
		<Route path="/register">
			<Register  />
		</Route>
		<Route path="/login">
			<Login  />
		</Route>
	</Switch>
);

export default App;
