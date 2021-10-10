import AttendanceGraph from "../../components/AttendanceGraph";
import UpcomingSessionsSidebar from "../../components/UpcomingSessionsSidebar";
import Navbarcomponent from "../../components/Navbarcomponent";
import "./AdminDashboard.css";
import Button from "../../components/Button";

const AdminDashboard = () => {
	const name = "Sarah";
	return (
		<>
			<Navbarcomponent />
			<h1 className="white-text center-text"> Welcome {name}!</h1>
			<div className="button-container">
				<Button label="New session" mode="primary" size="medium" />
				<Button label="New cohort" mode="secondary" size="medium" />
			</div>
			<div className="admin-main-container">
				<UpcomingSessionsSidebar />
				<AttendanceGraph />
			</div>
		</>
	);
};

export default AdminDashboard;
