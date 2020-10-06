"use strict";
const express = require('express');
const router = express.Router();
//require express validation to validate the fields
const { check, validationResult } = require("express-validator");
const updateController = require("../controller/update");
//const auth = require('../middleware/auth');

//router.use(auth);
//Route to handle Post Login Request Call
router.post('/userprofile', updateController.userprofile);  

//Route to handle Post update biz profile Request Call
router.post('/bizprofile', updateController.bizprofile);  

module.exports = router;