import upcomingSessionsAdmin from "../../data/upcomingSessionsAdmin";
import generateUpcomingSessionComponents from "../../utils/generateUpcomingSessionComponents";
import "./UpcomingSessionsSidebar.css";

const UpcomingSessionsSidebar = () => {
	return (
		<div className="sessions-left-sidebar">
			<h2 className="white-text">Upcoming sessions</h2>
			{generateUpcomingSessionComponents(upcomingSessionsAdmin)}
		</div>
	);
};

export default UpcomingSessionsSidebar;
