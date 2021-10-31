import $ from "jquery";

import Button from "../components/Button";

const displayMentorsTableForSession = (mentors) => {
	return mentors.map((mentor, index) => {
		const requestMentor = () => {
			// replace with admin name from token
			const name = "Sarah";
			console.log(mentor.email);
			const sessionId = $("#session-container").attr("data");
			console.log(sessionId);
			const date = "12/08.1997";
			const time = "18:00";

			//call api (no need, just putting this here so u see below comment)
			// replace from address ith admin email from token

			// sendmail(
			// 	{
			// 		from: "no-reply@yourdomain.com",
			// 		to: "pietrzad@gmail.com",
			// 		subject: "test sendmail",
			// 		test: `
			// 		Hi ${mentor.mentor_name}, we are short staffed for a session on ${date} at ${time} and would like to request your help.
			// 		If you are available, please log into the code your future and sign up to the session.
			// 		Thank you for your help.
			// 		Best wishes,
			// 		${name}`,
			// 	},
			// 	function (err, reply) {
			// 		console.log(err && err.stack);
			// 		console.dir(reply);
			// 	}
			// );
		};

		return (
			<tr key={`${index}-mentors-to-request`}>
				<td key={`${index}-mentor--name-r`}>{mentor.mentor_name}</td>
				<td key={`${index}-mentor-skills-r`}>{mentor.skills.join(" | ")}</td>
				<td key={`${index}-mentor-request-btn`}>
					<Button
						label="Request"
						mode="primary"
						size="small"
						onClick={requestMentor}
					/>
				</td>
			</tr>
		);
	});
};

export default displayMentorsTableForSession;
