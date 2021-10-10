import AttendanceGraph from "../../components/AttendanceGraph";
import UpcomingSessionsSidebar from "../../components/UpcomingSessionsSidebar";

import "./AdminDashboard.css";

const AdminDashboard = () => {
return(
  <div className="admin-main-container">
    <UpcomingSessionsSidebar />
    <AttendanceGraph />
  </div>
);
};

export default AdminDashboard;