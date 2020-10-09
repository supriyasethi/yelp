"use strict";
const mysql = require('mysql');

//creating mysql database connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "yelplab1"
  });
  

// var pool      =    mysql.createPool({
//   connectionLimit : 10,
//   host     : 'localhost',
//   user     : 'root',
//   password : 'password',
//   database : 'yelplab1',
//   debug    :  false
// });    

connection.connect(function(err) { 
    if (err) throw err;
    console.log("Database Connected!");
  });

// var getConnection = function(callback) {
//   pool.getConnection(function(err, connection) {
//       callback(err, connection);
//   });
// };

//module.exports = getConnection;
module.exports = connection;