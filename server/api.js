// import { Router } from "express";

// const router = new Router();

import { Router } from "express";
import "dotenv/config";
import SHA256 from "crypto-js/sha256";
import * as EmailValidator from "email-validator";
import process from "process";
import { pool } from "./db";
const uuid = require("uuid");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const router = new Router();

router.post("/signup", (req, res) => {
	console.log("register api");
	const {
		firstname,
		lastname,
		email,
		password,
		cohort,
		usertype,
		html_css,
		javascript,
		react,
		node,
		postgresql,
		mongodb,
	} = req.body;
	const isValidEmail = EmailValidator.validate(email);
	const schema = new passwordValidator();
	schema
		.is()
		.min(8) // Minimum length 8
		.is()
		.max(100) // Maximum length 100
		.has()
		.uppercase() // Must have uppercase letters
		.has()
		.lowercase() // Must have lowercase letters
		.has()
		.digits(1) // Must have at least 1 digits
		.has()
		.not()
		.spaces();

	const isValidPassword = schema.validate(password);
	const hashedPassword = SHA256(password).toString();
	const saltedPassword = SHA256(
		hashedPassword + process.env.PASSWORD_SALT
	).toString();
	if (isValidEmail && isValidPassword && firstname && lastname && usertype) {
		const newUser = {
			id: uuid.v4(),
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: saltedPassword,
			cohort: cohort,
			usertype: usertype,
			html_css: html_css,
			javascript: javascript,
			react: react,
			node: node,
			postgresql: postgresql,
			mongodb: mongodb,
		};
		pool.query(
			"SELECT * FROM users where email=$1",
			[newUser.email],
			(error, result) => {
				if (result.rows.length > 0) {
					res.json({ register: "error-registereduser" });
				} else {
					pool
						.query(
							"INSERT INTO users (id,firstname,lastname,email,password,cohort,user_type,html_css,javascript,react,node,postgresql,mongodb) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
							[
								newUser.id,
								newUser.firstname,
								newUser.lastname,
								newUser.email,
								newUser.password,
								newUser.cohort,
								newUser.usertype,
								newUser.html_css,
								newUser.javascript,
								newUser.react,
								newUser.node,
								newUser.postgresql,
								newUser.mongodb,
							]
						)
						.then((result) => {
							pool.query("SELECT id from clubs").then((result) => {
								console.log(result.rows);
								result.rows.forEach((id) => {
									pool.query(
										"insert into sessions (club_id,user_id,booking_status,attendance_status,free_note) values ($1,$2,false,false,'')",
										[id.id, newUser.id]
									);
								});
								res.json({ register: "success" });
							});
						});
				}
			}
		);
	} else {
		res.json({ msg: "Please enter the correct details!!!" });
	}
});

router.post("/signin", (req, res) => {
	console.log("sign in called");
	//take email and password from front end
	const { email, password } = req.body;
	console.log("sign in called");
	//hash and salt the password
	const hashedPassword = SHA256(password).toString();
	const saltedPassword = SHA256(
		hashedPassword + process.env.PASSWORD_SALT
	).toString();
	//check hashed password in database and return token if passwords match
	if (email && password) {
		pool
			.query("SELECT * FROM users WHERE email=$1 and password=$2", [
				email,
				saltedPassword,
			])
			.then((result) => {
				if (result.rows.length > 0) {
					//create token and return as a json object
					console.log(result.rows);
					const user = {
						email: email,
						userid: result.rows[0].id,
						usertype: result.rows[0].user_type,
					};
					console.log(user);
					const token = jwt.sign(user, process.env.TOKEN_SECRET, {
						expiresIn: "7 days",
					});
					return res.json({
						token: token,
						auth: "success",
						usertype: user.usertype,
					});
				} else {
					return res.status(400).json({
						auth: "error",
						errors: {
							email: "Incorrect Email and/or Password!",
						},
					});
				}
			})
			.catch((e) => res.send(JSON.stringify(e)));
	} else {
		return res.status(400).json({
			auth: "error",
			errors: { email: "Please enter Email and Password!" },
		});
	}
});

//verify token middleware
function authenticateToken(req, res, next) {
	console.log("authenticate function called");
	const authHeader = req.headers["authorization"];
	console.log("AUTHEADER IS____" + authHeader);
	const token = authHeader && authHeader.split(" ")[1];
	// console.log("TOKEN IS" + token);
	if (token == null) {
		return res.sendStatus(401);
	}
	//verify token if it is verified contunie with end point otherwise send a forbidden 403 message to front end
	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
		if (err) {
			res.sendStatus(403);
		}
		req.user = user;
		next();
	});
}

//verify user is admin middleware
function admincheck(req, res, next) {
	const userID = req.user.userid;
	pool
		.query("SELECT user_type from users where id=$1;", [userID])
		.then((result) => {
			let user_type = result.rows[0].user_type;
			if (user_type === "admin") {
				next();
			} else {
				res.sendStatus(403);
			}
		});
}

router.get("/dashboard", authenticateToken, (req, res) => {
	const userID = req.user.userid;
	let student = {
		upcomingsessions: "",
		bookedsessions: "",
		zoom_link: "",
		topics: "",
		firstname: "",
		lastname: "",
		cohort: "",
		usertype: "",
	};

	pool
		.query(
			"select to_char(start_date AT TIME ZONE 'Z','DD-MM-YYYY') as date, to_char(start_date AT TIME ZONE 'Z','HH24:MI') as start_time,to_char(end_date AT TIME ZONE 'Z','HH24:MI') as end_time,club_name,club_id from ( sessions inner join users on sessions.user_id=users.id ) inner join clubs on sessions.club_id=clubs.id where users.id=$1 and sessions.booking_status=false and start_date> now()",
			[userID]
		)
		.then((result) => {
			student.upcomingsessions = result.rows;
			pool
				.query(
					"select to_char(start_date AT TIME ZONE 'Z','DD-MM-YYYY') as date, to_char(start_date AT TIME ZONE 'Z','HH24:MI') as start_time,to_char(end_date AT TIME ZONE 'Z','HH24:MI') as end_time,club_name,club_id from ( sessions inner join users on sessions.user_id=users.id ) inner join clubs on sessions.club_id=clubs.id where users.id=$1 and sessions.booking_status=true and start_date> now()",
					[userID]
				)
				.then((result) => {
					student.bookedsessions = result.rows;
					pool.query("select *  from modules").then((result) => {
						student.topics = result.rows;
						pool
							.query(
								"select firstname,lastname,cohort,user_type  from users where id=$1",
								[userID]
							)
							.then((result) => {
								console.log(result.rows);
								student.firstname = result.rows[0].firstname;
								student.lastname = result.rows[0].lastname;
								student.cohort = result.rows[0].cohort;
								student.usertype = result.rows[0].user_type;
								pool.query("select zoom_link from zoom").then((result) => {
									student.zoom_link = result.rows[0].zoom_link;
									res.json(student);
								});
							});
					});
				});
		})
		.catch((e) => res.send(JSON.stringify(e)));
});

router.get("/cohorts", (req, res) => {
	pool
		.query("SELECT cohort FROM cohorts")
		.then((result) => {
			let cohorts = result.rows.map((cohort) => {
				return cohort.cohort;
			});
			res.json(cohorts);
		})

		.catch((e) => res.send(JSON.stringify(e)));
});

router.get("/skills", (req, res) => {
	pool
		.query("SELECT skill FROM skills")
		.then((result) => {
			let skills = result.rows.map((skill) => {
				return skill.skill;
			});
			res.json(skills);
		})

		.catch((e) => res.send(JSON.stringify(e)));
});

router.post("/booksession", authenticateToken, (req, res) => {
	const { club_id, note, module_id } = req.body;
	const userID = req.user.userid;

	pool
		.query(
			"select * from sessions where user_id=$1 and club_id=$2",

			[userID, club_id]
		)
		.then((result) => {
			pool
				.query(
					"UPDATE sessions SET booking_status = 'true', free_note=$1,module_id=$2 WHERE club_id = $3 and user_id=$4;",
					[note, module_id, club_id, userID]
				)
				.then(() => {
					res.sendStatus(200);
				});
			// }
		});
});

router.post("/updateattendance", authenticateToken, (req, res) => {
	const { club_id } = req.body;
	const userID = req.user.userid;
	pool
		.query(
			"UPDATE sessions SET attendance_status = 'true' WHERE club_id = $1 and user_id=$2;",
			[club_id, userID]
		)
		.then(() => {
			res.sendStatus(200);
		});
});

router.get("/graph", authenticateToken, admincheck, (req, res) => {
	let month = req.query.month;
	let year = req.query.year;
	let startdate = moment(month + year, "MM-YYYY");
	let enddate = moment(startdate).add(1, "M");

	pool
		.query(
			"SELECT club_name, count(club_name) as total_attendance FROM (sessions inner join clubs on sessions.club_id=clubs.id ) where start_date >$1 and end_date<$2  and attendance_status='true' group by club_name",
			[startdate, enddate]
		)
		.then((result) => {
			if (result.rows.length > 0) {
				res.json(result.rows);
			} else {
				res.json({ message: "no-attendance" });
			}
		})

		.catch((e) => res.send(JSON.stringify(e)));
});

router.post("/cancelbooking", authenticateToken, (req, res) => {
	const { club_id } = req.body;
	const userID = req.user.userid;
	pool
		.query(
			"UPDATE sessions SET booking_status = 'false',free_note='' WHERE club_id = $1 and user_id=$2;",
			[club_id, userID]
		)
		.then(() => {
			res.sendStatus(200);
		});
});

router.post("/changezoomlink", authenticateToken, admincheck, (req, res) => {
	const { zoom_link } = req.body;
	pool.query("UPDATE zoom SET zoom_link=$1;", [zoom_link]).then(() => {
		res.sendStatus(200);
	});
});

router.post("/assignadmin", authenticateToken, admincheck, (req, res) => {
	const { email } = req.body;
	pool
		.query("UPDATE users SET user_type='admin' WHERE email=$1;", [email])
		.then(() => {
			res.sendStatus(200);
		});
});

router.post("/deleteaccount", authenticateToken, admincheck, (req, res) => {
	const { email } = req.body;
	pool.query("SELECT id from users WHERE email=$1;", [email]).then((result) => {
		if (result.rows.length > 0) {
			let userID = result.rows[0].id;
			console.log(result.rows);
			pool
				.query("delete from sessions where user_id=$1;", [userID])
				.then((result) => {
					pool.query("DELETE from users WHERE email=$1;", [email]);
					res.sendStatus(200);
				});
		} else {
			res.sendStatus(400);
		}
	});
});
router.get("/upcomingsessions", authenticateToken, admincheck, (req, res) => {
	let currentTime = new Date();
	pool
		.query(
			"select clubs.id as session_id,club_name as session_title,to_char(start_date,'DD-MM-YYYY') as session_date,to_char(start_date,'HH24:MI') as start_time,to_char(end_date,'HH24:MI') as end_time,sum(case when user_type  = 'student' then 1 else 0 end) as registered_student,sum(case when user_type  = 'mentor' then 1 else 0 end) as registered_mentor from ( sessions inner join users on sessions.user_id=users.id ) inner join clubs on sessions.club_id=clubs.id where sessions.booking_status=true and start_date>$1 group by clubs.id",
			[currentTime]
		)
		.then((result) => {
			res.json(result.rows);
		})

		.catch((e) => res.send(JSON.stringify(e)));
});



router.post("/createnewsession", authenticateToken, admincheck, (req, res) => {
	const { session_date, start_time, end_time } = req.body;
	const userID = req.user.userid;
	let start_date = moment(session_date + " " + start_time);
	console.log("start date", start_date);
	let end_date = moment(session_date + " " + end_time);
	let club_name = "";
	let cutoff_date = start_date.clone();
	cutoff_date = cutoff_date.subtract(5, "days");
	let users;
	let clubid;

	pool
		.query("SELECT user_type from users where id=$1;", [userID])
		.then((result) => {
			let user_type = result.rows[0].user_type;
			if (user_type === "admin") {
				pool
					.query("SELECT id from clubs ORDER BY id DESC  LIMIT 1")
					.then((result) => {
						clubid = result.rows[0].id + 1;
						club_name = `HCW-${result.rows[0].id + 1}`;
						pool
							.query(
								"INSERT INTO clubs (start_date,end_date,club_name,cutoff_date) values($1,$2,$3,$4);",
								[start_date, end_date, club_name, cutoff_date]
							)
							.then((result) => {
								pool.query("SELECT id from users").then((result) => {
									users = result.rows;
									users.forEach((user) => {
										pool.query(
											"insert into sessions (club_id,user_id,booking_status,attendance_status,free_note) values ($1,$2,false,false,'')",
											[clubid, user.id]
										);
									});
								});
								res.sendStatus(200);
							});
					});
			} else {
				res.sendStatus(401);
			}
		});
});

router.get("/allcohorts", authenticateToken, admincheck, async (req, res) => {
	const userID = req.user.userid;
	let cohortlist;
	let data = {};
	await pool.query(" SELECT cohort from cohorts").then((result) => {
		cohortlist = result.rows.map((info) => {
			return info.cohort;
		});
	});
	let listlength = 0;
	cohortlist.forEach((cohort) => {
		pool
			.query(
				"SELECT firstname || ' ' || lastname as student_name,email from users where user_type='student' and cohort=$1",
				[cohort]
			)
			.then((result) => {
				data[cohort] = result.rows;
				listlength += 1;
				if (listlength === cohortlist.length) {
					res.json(data);
				}
			});
	});
});
router.post("/createcohort", authenticateToken, admincheck, (req, res) => {
	const { cohort_name } = req.body;
	const userID = req.user.userid;
	pool
		.query("SELECT user_type from users where id=$1;", [userID])
		.then((result) => {
			let user_type = result.rows[0].user_type;
			if (user_type === "admin") {
				pool
					.query("INSERT INTO  cohorts (cohort) values($1)", [cohort_name])
					.then(() => {
						res.sendStatus(200);
					});
			} else {
				res.sendStatus(401);
			}
		});
});

router.get("/volunteersinfo", authenticateToken, admincheck, (req, res) => {
	pool
		.query(
			"SELECT firstname || ' ' || lastname as mentor_name, email,html_css,javascript,react,node,postgresql,mongodb from users where user_type='mentor' "
		)
		.then((result) => {
			let data = [];
			let mentors = result.rows;
			let skills = [
				"html_css",
				"javascript",
				"react",
				"node",
				"postgresql",
				"mongodb",
			];
			mentors.forEach((mentor) => {
				let skillmentor = [];
				skills.forEach((skill) => {
					if (mentor[skill]) {
						skillmentor = [...skillmentor, skill];
					}
				});
				mentor.skills = skillmentor;
				console.log(mentors);
			});
			res.json(mentors);
		})

		.catch((e) => res.send(JSON.stringify(e)));
});

router.get(
	"/volunteerspecificskill",
	authenticateToken,
	admincheck,
	(req, res) => {
		let skill = req.query.skill;

		pool
			.query(
				"SELECT firstname || ' ' || lastname as mentor_name, email,html_css,javascript,react,node,postgresql,mongodb from users where user_type='mentor' "
			)
			.then((result) => {
				let mentors = result.rows;
				let skilledmentor = mentors.filter((mentor) => {
					return mentor[skill] === true;
				});
				res.json(skilledmentor);
			})

			.catch((e) => res.send(JSON.stringify(e)));
	}
);
router.get("/sessiondetails", authenticateToken, (req, res) => {
	let club_id = req.query.session_id;
	let sessiondetails = { session: {}, student: {}, mentor: {} };
	pool
		.query(
			"select clubs.id as session_id,club_name as session_title,to_char(start_date,'DD-MM-YYYY') as session_date,to_char(start_date,'HH24:MI') as start_time,to_char(end_date,'HH24:MI') as end_time from clubs where clubs.id=$1",
			[club_id]
		)
		.then((result) => {
			sessiondetails.session = result.rows;
			pool
				.query(
					"select firstname || ' ' || lastname as student_name,free_note,modules.module_name,modules.week  from ( sessions inner join users on sessions.user_id=users.id ) inner join clubs on sessions.club_id=clubs.id inner join modules on sessions.module_id=modules.id where clubs.id=$1 and booking_status=true and user_type='student'",
					[club_id]
				)
				.then((result) => {
					sessiondetails.student = result.rows;
					pool
						.query(
							"select firstname || ' ' || lastname as mentor_name,html_css,javascript,react,node,postgresql,mongodb  from ( sessions inner join users on sessions.user_id=users.id ) inner join clubs on sessions.club_id=clubs.id where clubs.id=$1 and booking_status=true and user_type='mentor'",
							[club_id]
						)
						.then((result) => {
							sessiondetails.mentor = result.rows;
							res.json(sessiondetails);
						});
				});
		})

		.catch((e) => res.send(JSON.stringify(e)));
});

router.get("/findmentor", authenticateToken, admincheck, (req, res) => {
	let club_id = req.query.session_id;
	pool
		.query(
			"select users.id,firstname || ' ' || lastname as mentor_name,email,html_css,javascript,react,node,postgresql,mongodb from (users inner join sessions on sessions.user_id=users.id)  inner join clubs on sessions.club_id=clubs.id where clubs.id=$1 and booking_status=false and user_type='mentor'",
			[club_id]
		)
		.then((result) => {
			let mentors = result.rows;
			pool
				.query(
					" select distinct module_subject from (sessions inner join modules on sessions.module_id=modules.id) where club_id=$1",
					[club_id]
				)
				.then((result) => {
					let skills = result.rows;
					let skilledmentor;
					skills.forEach((skill) => {
						let newskilledmentor = mentors.filter((mentor) => {
							return mentor[skill.module_subject] === true;
						});
						console.log(newskilledmentor);
					});
					res.json(skilledmentor);
				});
		})

		.catch((e) => res.send(JSON.stringify(e)));
});


router.get("/studentattendance", authenticateToken, admincheck, (req, res) => {
	let month = req.query.month;
	let year = req.query.year;
	let startdate = moment(month + year, "MM-YYYY");
	let enddate = moment(startdate).add(1, "M");
	pool
		.query(
			"SELECT firstname || ' ' || lastname as student_name, cohort,clubs.id as session_id,club_name,to_char(start_date,'MM-DD-YYYY') as session_date, booking_status,attendance_status FROM (users inner join sessions on sessions.user_id=users.id ) inner join clubs on sessions.club_id=clubs.id  where  user_type='student' and start_date >$1 and end_date<$2 and booking_status=true",
			[startdate, enddate]
		)
		.then((result) => {
			res.json(result.rows);
		})

		.catch((e) => res.send(JSON.stringify(e)));
});

export default router;
