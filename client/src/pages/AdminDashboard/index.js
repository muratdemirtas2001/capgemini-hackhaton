import { useCallback, useEffect, useState } from "react";

import "./AdminDashboard.css";

// components
import Button from "../../components/Button";
import AttendanceGraph from "../../components/AttendanceGraph";
import upcomingSessionsAdmin from "../../data/upcomingSessionsAdmin";
import ResponsiveTable from "../../components/ResponsiveTable";
import AttendanceDateFilters from "../../components/AttendanceDateFilters";
import AttendanceAccordion from "../../components/AttendanceAccordion";
import MentorSkillFilter from "../../components/MentorSkillFilter/MentorSkillFilter";

// utils, data and constants
import createNavigationLinks from "../../utils/createNavigationLinks";
import DisplayUpcomingSessionsForAdmin from "../../utils/displaySessionsForAdmin";
import convertMonthToString from "../../utils/convertMonthToString";
import attendanceInfo from "../../data/attendanceInfo";
import displayMentorsTable from "../../utils/displayMentorsTable";
import mentorsData from "../../data/mentors";
import mentorsTableHeadings from "../../constants/mentorsTableHeadings";
import AdminNavigationItem from "../../components/AdminNavigationItem";
import AddAdminModal from "../../components/addAdminModal";
import DeleteUserModal from "../../components/DeleteUserModal";
import CohortsAccordion from "../../components/CohortsAccordion";
import NewSessionModal from "../../components/NewSessionModal";
import NewZoomLinkModal from "../../components/NewZoomLinkModal";
import NewCohortModal from "../../components/NewCohortModal";

const AdminDashboard = () => {
	const getCurrentDate = () => {
		return new Date();
	};
	const token = localStorage.getItem("users");

	const getCurrentMonth = () => {
		const date = new Date();
		const newMonth = date.getMonth() + 1;
		const month = convertMonthToString(newMonth);
		return month;
	};

	const [showModal, setShowModal] = useState(false);
	const [currentPage, setCurrentPage] = useState("Sessions");
	const [sessions, setSessions] = useState();
	const [month, setMonth] = useState(getCurrentMonth);
	const [year, setYear] = useState(getCurrentDate().getFullYear());
	const [skill, setSkill] = useState();
	const [modalType, setModalType] = useState();
	const [mentors, setMentors] = useState();
	const [attendanceInformation, setAttendanceInformation] =
		useState(attendanceInfo);
	const [filteredMentor, setFilteredMentor] = useState();
	const [render, setRender] = useState(false);
	const pageOptions = ["Sessions", "Attendance", "Mentors", "Cohorts"];
	// get this from api token
	const name = "";
	const headings = ["Session", "Date", "Students:Mentor", "Actions"];

	const displayModal = useCallback((newModalType) => {
		setModalType(newModalType);
		setShowModal(true);
	}, []);

	useEffect(() => {
		if (currentPage === "Sessions") {
			//call api to get sessions info
			//setSessions to api response
			// delete upcomingSessionsAdmin var
			fetch("/api/upcomingsessions", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setSessions(data);
				});
		}
		// if (currentPage === "Attendance") {
		// 	//call api to get attendance info, pass the year and and month
		// 	//setAttendanceInformation to api response
		// 	// delete attendanceInfo var
		// }
		if (currentPage === "Mentors") {
			// check if skill has been selected
			// call api here to get mentors info passing (or not) the selected skill
			// setMentors with what is retrieved from api
			// get rid of mentorsData import
			fetch("/api/volunteersinfo", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setMentors(data);
				});
		}
	}, [currentPage, token, render]);

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
							onClick={() => displayModal("add admin")}
						/>
						<AdminNavigationItem
							page={"Delete user"}
							active={true}
							onClick={() => displayModal("delete user")}
						/>
					</div>
				</div>
				{currentPage === "Sessions" && sessions && (
					<div className="admin-container">
						<div className="admin-heading-container">
							<h2 className="admin-heading">Upcoming sessions</h2>
							<Button
								label="New session"
								mode="primary"
								size="small"
								onClick={() => displayModal("new session")}
							/>
							<Button
								label="Update zoom link"
								mode="primary"
								size="small"
								onClick={() => displayModal("new zoom link")}
							/>
						</div>
						<ResponsiveTable
							data={sessions}
							headings={headings}
							displayFunction={DisplayUpcomingSessionsForAdmin}
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
				{currentPage === "Mentors" && mentors && (
					<div className="admin-container">
						<h2 className="admin-heading">Mentors</h2>
						<MentorSkillFilter
							skill={skill}
							setSkill={setSkill}
							mentors={mentors}
							setMentors={setMentors}
							setFilteredMentor={setFilteredMentor}
						/>
						<ResponsiveTable
							data={filteredMentor ? filteredMentor : mentors}
							displayFunction={displayMentorsTable}
							headings={mentorsTableHeadings}
						/>
					</div>
				)}
				{currentPage === "Cohorts" && (
					<div className="admin-container">
						<div className="admin-heading-container">
							<h2 className="admin-heading">Cohorts</h2>
							<Button
								label="New"
								mode="primary"
								size="small"
								onClick={() => displayModal("new cohort")}
							/>
						</div>
						<CohortsAccordion render={render} setRender={setRender} />
					</div>
				)}
				{modalType === "delete user" && (
					<DeleteUserModal setShowModal={setShowModal} show={showModal} />
				)}
				{modalType === "add admin" && (
					<AddAdminModal setShowModal={setShowModal} show={showModal} />
				)}
				{modalType === "new session" && (
					<NewSessionModal
						setShowModal={setShowModal}
						show={showModal}
						render={render}
						setRender={setRender}
					/>
				)}
				{modalType === "new zoom link" && (
					<NewZoomLinkModal setShowModal={setShowModal} show={showModal} />
				)}
				{modalType === "new cohort" && (
					<NewCohortModal
						setShowModal={setShowModal}
						show={showModal}
						render={render}
						setRender={setRender}
					/>
				)}
			</div>
		</div>
	);
};

export default AdminDashboard;
