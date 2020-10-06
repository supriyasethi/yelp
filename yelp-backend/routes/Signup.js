"use strict";
const express = require('express');
const router = express.Router();
//require express validation to validate the fields
const { check, validationResult } = require("express-validator");
const signupController = require("../controller/signup");

//Route to handle Post Request Call
router.post('/user',[check("firstname")
.exists()
.withMessage("FirstName is required")
.isString()
.withMessage("FirstName should be a string"),
check("lastname")
.exists()
.withMessage("LastName is required")
.isString()
.withMessage("FirstName should be a string"),
check("username")
.exists()
.withMessage("Username is required")
.isEmail()
.withMessage("Username should be email"),
check("password")
.exists()
.withMessage("Password is required"),
check("city")
.exists()
.withMessage("City is required")
.isString()
.withMessage("City should be a string"),
],
signupController.user); 



//Route to handle Post Request Call
router.post('/biz', signupController.biz); 
;

module.exports = router;