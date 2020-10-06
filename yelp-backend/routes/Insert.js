"use strict";
const express = require('express');
const router = express.Router();
var con = require('../connection');
const mysql = require('mysql');
const insertController = require("../controller/insert");
//const auth = require('../middleware/auth');

//router.use(auth);
//Route to handle Post Request Call
router.post('/event', insertController.insertevent);     

//Route to handle Post insertMenu Request Call
router.post('/menu', insertController.insertmenu); 


module.exports = router;