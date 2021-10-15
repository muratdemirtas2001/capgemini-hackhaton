import AttendanceGraph from "../../components/AttendanceGraph";
import Navbarcomponent from "../../components/Navbarcomponent";
import "./AdminDashboard.css";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import createNavigationLinks from "../../utils/createNavigationLinks";
import upcomingSessionsAdmin from "../../data/upcomingSessionsAdmin";
import ResponsiveTable from "../../components/ResponsiveTable";
import displayUpcomingSessionsForAdmin from "../../utils/displaySessionsForAdmin";
import AttendanceDateFilters from "../../components/AttendanceDateFilters";
import convertMonthToString from "../../utils/convertMonthToString";

const AdminDashboard = () => {
	const [currentPage, setCurrentPage] = useState("Sessions");
	const [currentMonth, setCurrentMonth] = useState();
	const [currentYear, setCurrentYear] = useState();
	const [month, setMonth] = useState();
	const [year, setYear] = useState();
	const pageOptions = ["Sessions", "Attendance", "Volunteers", "Cohorts"];
	const name = "Sarah";
	const headings = ["Session", "Date", "Students:Volunteers", ""];

	useEffect(() => {
		if (currentPage === "Attendance") {
			let newDate = new Date();
			const month = newDate.getMonth() + 1;
			setCurrentYear(newDate.getFullYear());
			setCurrentMonth(convertMonthToString(month));
		}
	}, [currentPage, currentMonth, currentYear]);

	return (
		<>
			<Navbarcomponent />
			<h1 className="white-text center-text"> Welcome {name}!</h1>
			<div className="admin-main-container">
				<div className="admin-nav-container">
					{createNavigationLinks(pageOptions, currentPage, setCurrentPage)}
				</div>
				{currentPage === "Sessions" && (
					<div className="admin-container">
						<h2>Upcoming sessions</h2>
						<ResponsiveTable
							data={upcomingSessionsAdmin}
							headings={headings}
							displayFunction={displayUpcomingSessionsForAdmin}
						/>
					</div>
				)}
				{currentPage === "Attendance" && (
					<div className="admin-container">
						<h2>Attendance</h2>
						<a href="#Student"> Students</a>
						<a href="#Mentor"> Mentors </a>
						<AttendanceDateFilters
							month={month}
							setMonth={setMonth}
							year={year}
							setYear={setYear}
							currentMonth={currentMonth}
							currentYear={currentYear}
						/>
						<div className="graphs-container">
							<AttendanceGraph type={"Student"} />
							<AttendanceGraph type={"Mentor"} />
						</div>
						<div></div>
					</div>
				)}
			</div>
		</>
	);
};

export default AdminDashboard;
