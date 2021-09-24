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
// const moment = require("moment-timezone");
const router = new Router();

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

router.post("/signup", (req, res) => {
	console.log("register api");
	const { firstname,lastname, email, password,cohort,usertype } = req.body;
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
	if (isValidEmail && isValidPassword && firstname && lastname && cohort && usertype) {
		const newUser = {
			id: uuid.v4(),
			firstname: firstname,
			lastname:lastname,
			email: email,
			password: saltedPassword,
			cohort:cohort,
			usertype:usertype
		};
		pool.query(
			"SELECT * FROM users where email=$1",
			[newUser.email],
			(error, result) => {
				if (result.rows.length > 0) {
					res.json({ register: "error-registereduser" });
				} else {
					pool.query(
						"INSERT INTO users (id,firstname,lastname,email,password,cohort,user_type) VALUES ($1,$2,$3,$4,$5,$6,$7)",
						[
							newUser.id,
							newUser.firstname,
							newUser.lastname,
							newUser.email,
							newUser.password,
							newUser.cohort,
							newUser.usertype,
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


export default router;
