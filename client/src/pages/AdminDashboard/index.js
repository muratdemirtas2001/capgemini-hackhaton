import { useEffect, useState } from "react";

import "./AdminDashboard.css";

// components
import AttendanceGraph from "../../components/AttendanceGraph";
import Navbarcomponent from "../../components/Navbarcomponent";
import upcomingSessionsAdmin from "../../data/upcomingSessionsAdmin";
import ResponsiveTable from "../../components/ResponsiveTable";
import AttendanceDateFilters from "../../components/AttendanceDateFilters";
import AttendanceAccordion from "../../components/AttendanceAccordion";
import MentorSkillFilter from "../../components/MentorSkillFilter/MentorSkillFilter";

// utils, data and constants
import createNavigationLinks from "../../utils/createNavigationLinks";
import displayUpcomingSessionsForAdmin from "../../utils/displaySessionsForAdmin";
import convertMonthToString from "../../utils/convertMonthToString";
import attendanceInfo from "../../data/attendanceInfo";
import displayMentorsTable from "../../utils/displayMentorsTable";
import mentorsData from "../../data/mentors";
import mentorsTableHeadings from "../../constants/mentorsTableHeadings";

const AdminDashboard = () => {
	const [currentPage, setCurrentPage] = useState("Sessions");
	const [currentMonth, setCurrentMonth] = useState();
	const [currentYear, setCurrentYear] = useState();
	const [month, setMonth] = useState();
	const [year, setYear] = useState();
	const [skill, setSkill] = useState();
	const [mentors, setMentors] = useState(mentorsData);
	const [attendanceInformation, setAttendanceInformation] =
		useState(attendanceInfo);
	const pageOptions = ["Sessions", "Attendance", "Mentors", "Cohorts"];
	const name = "Sarah";
	const headings = ["Session", "Date", "Students:Mentors", ""];

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
						<h2 className="admin-heading">Upcoming sessions</h2>
						<ResponsiveTable
							data={upcomingSessionsAdmin}
							headings={headings}
							displayFunction={displayUpcomingSessionsForAdmin}
						/>
					</div>
				)}
				{currentPage === "Attendance" && (
					<div className="admin-container">
						<h2 className="admin-heading">Attendance</h2>
						<AttendanceDateFilters
							month={month}
							setMonth={setMonth}
							year={year}
							setYear={setYear}
							currentMonth={currentMonth}
							currentYear={currentYear}
						/>
						<div>
							<AttendanceGraph />
						</div>
						<div>
							<AttendanceAccordion
								attendanceInformation={attendanceInformation}
							/>
						</div>
					</div>
				)}
				{currentPage === "Mentors" && (
					<div className="admin-container">
						<h2 className="admin-heading">Mentors</h2>
						<MentorSkillFilter skill={skill} setSkill={setSkill} />
						<ResponsiveTable
							data={mentors}
							displayFunction={displayMentorsTable}
							headings={mentorsTableHeadings}
						/>
					</div>
				)}
				{currentPage === "Cohorts" && (
					<div>
						<h2 className="admin-heading">Cohorts</h2>
					</div>
				)}
			</div>
		</>
	);
};

export default AdminDashboard;
