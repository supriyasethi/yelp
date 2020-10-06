"use strict";
const express = require("express");
const router = express.Router();
//require express validation to validate the fields
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const loginController = require("../controller/login");

//Route to handle Post Login Request Call
router.post(
	"/user",
	[
		check("username")
			.exists()
			.withMessage("Username is required")
			.isEmail()
			.withMessage("Username should be email"),
		check("password").exists().withMessage("Password is required"),
	],
	loginController.loginuser
);

//Route to handle Post Login Request Call
router.post(
	"/biz",
	[
		check("username")
			.exists()
			.withMessage("Username is required")
			.isEmail()
			.withMessage("Username should be email"),
		check("password").exists().withMessage("Password is required"),
	],
	loginController.loginbiz
);

router.use(auth);

module.exports = router;
