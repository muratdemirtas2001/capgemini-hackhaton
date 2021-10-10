import UpcomingSession from "../components/UpcomingSession";

const generateUpcomingSessionComponents = (sessions) => {
	return sessions.map((session, index) => {
		return (
			<UpcomingSession
				key={`${session.id}-${index}`}
				id={session.id}
				title={session.title}
				date={session.date}
				time={session.time}
				numberOfStudents={session.numberOfStudents}
				numberOfVolunteers={session.numberOfVolunteers}
			/>
		);
	});
};

export default generateUpcomingSessionComponents;
