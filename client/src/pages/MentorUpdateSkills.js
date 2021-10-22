import React, { useState } from "react";
import "./Modal.css";
function MentorUpdateSkills({
	closeModal,
	currentSkills,
	updateCurrentSkills,
}) {
	const [skills, setSkills] = useState(currentSkills);
	const [knowsHTML_CSS, setKnowsHTML_CSS] = useState(
		currentSkills.includes("HTML_CSS".toLowerCase())
	);
	const [knowsJavaScript, setKnowsJavaScript] = useState(
		currentSkills.includes("javaScript".toLowerCase())
	);
	const [knowsReact, setKnowsReact] = useState(
		currentSkills.includes("React".toLowerCase())
	);
	const [knowsNode, setKnowsNode] = useState(
		currentSkills.includes("Node".toLowerCase())
	);
	const [knowsPostgres, setKnowsPostgres] = useState(
		currentSkills.includes("Postgres".toLowerCase())
	);
	const [knowsMongoDB, setKnowsMongoDB] = useState(
		currentSkills.includes("MongoDB".toLowerCase())
	);
	const [updatedSkills, setUpdatedSkills] = useState([]);
	console.log(updatedSkills);
	function handelCheckBox(event) {
		if (!skills.includes(event.target.value)) {
			setSkills(skills.concat([event.target.value]));
		}
		console.log(event.target.value);
	}
	console.log(skills);
	return (
		<div className="modalBackground">
			<div className="modalContainer">
				<div className="titleCloseButton">
					<button onClick={() => closeModal(false)}>X</button>
				</div>
				<div className="title">
					<h3>Please tick the skills you want to update</h3>
				</div>
				<div
					className="body"
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
					}}
				>
					<label>
						<input
							type="checkbox"
							value="HTML_CSS"
							name="HTML_CSS"
							value="html_css"
							checked={knowsHTML_CSS}
							onClick={(event) => {
								setKnowsHTML_CSS(!knowsHTML_CSS);
								handelCheckBox(event);
							}}
						/>
						HTML_CSS
					</label>
					<label>
						<input
							type="checkbox"
							value="#javaScript"
							name="javaScript"
							checked={knowsJavaScript}
							onClick={(event) => {
								setKnowsJavaScript(!knowsJavaScript);
								handelCheckBox(event);
							}}
						/>
						javaScript
					</label>
					<label>
						<input
							type="checkbox"
							name="react"
							id="react"
							value="react"
							checked={knowsReact}
							onClick={(event) => {
								setKnowsReact(!knowsReact);
								handelCheckBox(event);
							}}
						/>
						REACT
					</label>
					<label>
						<input
							type="checkbox"
							value="node"
							name="node"
							checked={knowsNode}
							onClick={(event) => {
								setKnowsNode(!knowsNode);
								handelCheckBox(event);
							}}
						/>
						NODE
					</label>
					<label>
						<input
							type="checkbox"
							value="postgres"
							name="Postgres"
							checked={knowsPostgres}
							onClick={(event) => {
								setKnowsPostgres(!knowsPostgres);
								handelCheckBox(event);
							}}
						/>
						POSTGRES
					</label>
					<label>
						<input
							type="checkbox"
							value="mongodb"
							name="MongoDB"
							checked={knowsMongoDB}
							onClick={(event) => {
								setKnowsMongoDB(!knowsMongoDB);
								handelCheckBox(event);
							}}
						/>
						MongoDB
					</label>
				</div>
				<div className="footer">
					<button onClick={() => closeModal(false)} id="closeButton">
						Cancel
					</button>
					<button
						type="button"
						className="btn btn-success"
						onClick={() => {
							updateCurrentSkills(skills);
							closeModal(false);
						}}
					>
						Update
					</button>
				</div>
			</div>
		</div>
	);
}
export default MentorUpdateSkills;
