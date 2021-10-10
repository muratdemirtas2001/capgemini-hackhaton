import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => (
	<Switch>
		<Route path="/" exact>
			<Home />
		</Route>
		<Route path="/register">
			<Register  />
		</Route>
		<Route path="/login">
			<Login  />
		</Route>
		<Route path="/dashboard">
			<Dashboard  />
		</Route>
		<Route path="/admin">
			<AdminDashboard />
		</Route>
	</Switch>
);

export default App;
