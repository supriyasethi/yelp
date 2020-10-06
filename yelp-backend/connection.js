"use strict";
const mysql = require('mysql');

//creating mysql database connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "yelplab1"
  });
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });

module.exports = connection;