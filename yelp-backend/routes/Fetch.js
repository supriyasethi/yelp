"use strict";
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const fetchController = require("../controller/fetch");


router.get('/home', fetchController.fetchhome);   

router.get('/menu', fetchController.fetchmenu);

router.get('/event', fetchController.fetchevent);

router.get('/userp', fetchController.fetchuserp);  

router.get('/bizp', fetchController.fetchbizp);   

module.exports = router;