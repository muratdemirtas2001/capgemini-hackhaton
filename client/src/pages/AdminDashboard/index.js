import { useEffect, useState } from "react";

import "./AdminDashboard.css";

// components
import Button from "../../components/Button";
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
import AdminNavigationItem from "../../components/AdminNavigationItem";
import AddAdminModal from "../../components/addAdminModal";
import DeleteUserModal from "../../components/deleteUserModal";
import CohortsAccordion from "../../components/CohortsAccordion";

const AdminDashboard = () => {
	const [showModal, setShowModal] = useState(false);
	const modalContent = "Buttons";
	const [currentPage, setCurrentPage] = useState("Sessions");
	const [currentMonth, setCurrentMonth] = useState();
	const [currentYear, setCurrentYear] = useState();
	const [month, setMonth] = useState();
	const [year, setYear] = useState();
	const [skill, setSkill] = useState();
	const [modalType, setModalType] = useState();
	const [mentors, setMentors] = useState(mentorsData);
	const [attendanceInformation, setAttendanceInformation] =
		useState(attendanceInfo);
	const pageOptions = ["Sessions", "Attendance", "Mentors", "Cohorts"];
	const name = "Sarah";
	const headings = ["Session", "Date", "Students:Mentor", "Actions"];

	const displayDeleteUserModal = () => {
		setModalType("delete user");
		setShowModal(true);
	};

	const displayAddAdminModal = () => {
		setModalType("add admin");
		setShowModal(true);
	};

	useEffect(() => {
		if (currentPage === "Attendance") {
			let newDate = new Date();
			const month = newDate.getMonth() + 1;
			setCurrentYear(newDate.getFullYear());
			setCurrentMonth(convertMonthToString(month));
		}
	}, [currentPage, currentMonth, currentYear]);

	return (
		<div className="admin-body-container">
			<h1 className="center-text title"> Welcome {name}!</h1>
			<div className="admin-main-container">
				<div className="admin-nav-container">
					{createNavigationLinks(pageOptions, currentPage, setCurrentPage)}
					<div className="account-management-container">
						<p> Manage accounts </p>
						<AdminNavigationItem
							page={"Add admin"}
							active={true}
							onClick={displayAddAdminModal}
						/>
						<AdminNavigationItem
							page={"Delete user"}
							active={true}
							onClick={displayDeleteUserModal}
						/>
					</div>
				</div>
				{currentPage === "Sessions" && (
					<div className="admin-container">
						<div className="admin-heading-container">
							<h2 className="admin-heading">Upcoming sessions</h2>
							<Button label="New session" mode="primary" size="small" />
							<Button label="Update zoom link" mode="primary" size="small" />
						</div>
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
					<div className="admin-container">
						<div className="admin-heading-container">
							<h2 className="admin-heading">Cohorts</h2>
							<Button label="New" mode="primary" size="small" />
						</div>
						<CohortsAccordion />
					</div>
				)}
				{modalType === "delete user" && (
					<DeleteUserModal setShowModal={setShowModal} show={showModal} />
				)}
				{modalType === "add admin" && (
					<AddAdminModal setShowModal={setShowModal} show={showModal} />
				)}
			</div>
		</div>
	);
};

export default AdminDashboard;
