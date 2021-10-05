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
// const moment = require("moment");
// const moment = require("moment-timezone");
const router = new Router();

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

router.post("/signup", (req, res) => {
	console.log("register api");
	const { firstname, lastname, email, password, cohort, usertype, html_css,javascript,react,node,postgresql,mongodb } =
		req.body;
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
			node:node,
			postgresql:postgresql,
			mongodb:mongodb,
		};
		pool.query(
			"SELECT * FROM users where email=$1",
			[newUser.email],
			(error, result) => {
				if (result.rows.length > 0) {
					res.json({ register: "error-registereduser" });
				} else {
					pool.query(
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
						],
						(error, result) => {
							res.json({ register: "success" });
							console.log(error, result);
						}
					);
				}
			}
		);
	} else {
		res.json({ msg: "Please enter the correct details!!!" });
	}
});

router.post("/signin", (req, res) => {
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
					const user = {
						email: email,
						userid: result.rows[0].id,
						usertype: "user",
					};
					const token = jwt.sign(user, process.env.TOKEN_SECRET, {
						expiresIn: "7 days",
					});
					return res.json({ token: token, auth: "success" });
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
	console.log("AUTHEADER IS____"+authHeader);
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


router.get("/dashboard", authenticateToken, (req, res) => {
	// console.log(req);
	console.log("dashboard called");
	const userID = req.user.userid;

	pool
		.query("SELECT firstname,lastname,email,cohort,user_type FROM users WHERE id=$1", [
			userID,
		])
		.then((result) => {
			res.json(result.rows);
					})

		.catch((e) => res.send(JSON.stringify(e)));
				});


export default router;
