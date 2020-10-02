//import the require dependencies
var express = require('express');
var app = express();
//var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
const mysql = require("./Database");
//require express validation to validate the fields
const { check, validationResult } = require("express-validator");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));
app.use(bodyParser.json());
app.use(express.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password"
//   });

var con = {
  host: "localhost",
  user: "root",
  password: "password"
}
mysql = Database(con);

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

var signupUser = false;
var loginUser = false;

var Users = [{
    username : "ssupriya.sethi@gmail.com",
    password : "12345"
}]

var signupForm = [
  {
    firstname : "Supriya", 
    lastname  : "Sethi", 
    username  : "ssupriya.sethi@gmail.com", 
    password  : "12345", 
    city      : "San Jose"
  }]
var userExists;

//Route to handle Post Request Call
app.post('/signup',function(req,res){
  
  console.log("Inside Signup Post Request");  
  console.log("Req Body : ",req.body);
  signupUser = true;
  (async () => {
    userExists = await builSelectQueries(req.body);
    console.log(result);
    connection.end();
  })();
  //var userExists = builSelectQueries(req.body);
  console.log('userExists', userExists);
  if(userExists) {       
    res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
    req.session.user = user;
    res.writeHead(422,{
        'Content-Type' : 'text/plain'
    })
    res.end("User is already registered!");
  }   
  else {       
    buildInsertQueries(req.body);
    res.writeHead(200,{
      'Content-Type' : 'text/plain'
    })
    res.end("User Registered Successfully!");
    }
  });
  
//Route to handle Post Request Call
app.post('/login',function(req,res){
  
  
  console.log("Inside Login Post Request");  
  console.log("Req Body : ",req.body);

  loginUser = true;
  (async () => {
    userExists = await builSelectQueries(req.body);
    console.log(result);
    connection.end();
  })();
  //builSelectQueries(req.body);
  console.log('userExists', userExists);
  if(userExists) {
    res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
          //req.session.user = user;
          res.writeHead(200,{
              'Content-Type' : 'text/plain'
          })
          res.end("Successful Login!");
  } else
  {
    console.log("Invalid");
          //console.log(user);
          res.writeHead(422,{
              'Content-Type' : 'text/plain'
          })
          res.end("Invalid Username & Password!");
  }
  // Users.filter(function(user){
  //     if(user.username === req.body.loginFormInfo.Username && user.password === req.body.loginFormInfo.Password){
  //         res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
  //         req.session.user = user;
  //         res.writeHead(200,{
  //             'Content-Type' : 'text/plain'
  //         })
  //         res.end("Successful Login!");
          
  //     }
  //     else {
          
  //         console.log("Invalid");
  //         console.log(user);
  //         res.writeHead(422,{
  //             'Content-Type' : 'text/plain'
  //         })
  //         res.end("Invalid Username & Password!");
  //       }
  //     })
    });


app.post('/profile',function(req,res){
  
      console.log("Inside Profile Post Request");
      //console.log("Req Body : ", username + "password : ",password);
      console.log("Req Body : ",req.body);
      signupForm.filter(function(user){
          if(user.username === req.body.Username && user.password === req.body.Password){
              res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
              req.session.user = user;
              res.writeHead(200,{
                  'Content-Type' : 'text/plain'
              })
              let profileInfo = {
                firstname : user.firstname,
                zipcode : user.zipcode
              }
              res.end(JSON.stringify(profileInfo));
              
          }
          else {
              
              console.log("Invalid");
              console.log(user);
              res.writeHead(422,{
                  'Content-Type' : 'text/plain'
              })
              res.end("Invalid Username & Password!");
            }
          })
        });

function buildInsertQueries(info) {

  console.log('inside build insert queries');
  console.log('signupuser', signupUser);
  //console.log('signupform.firstname', signupForm[firstname]);
  if (signupUser) {
    var sql = 
    mysql.format("INSERT INTO yelplab1.user (first_name, last_name, email_id, city) VALUES('"+info.firstname+"','" + info.lastname+"','" +info.username+"','" +info.city+"')");
    con.query(sql, function (err, result) {
       if (err) throw err;
       else {
       console.log( result);
       sql = mysql.format("INSERT INTO yelplab1.login (user_id, username, password) VALUES('"+result.insertId+"','"+ info.username+"','" +info.password+"')");
       con.query(sql, function (err, result) {
        if (err) throw err;
        console.log( result);
       });
       }
     });
  }
}


function builSelectQueries(info) {

  console.log('inside build select queries');
  console.log('loginUser', loginUser);
  var sql = "SELECT user_id FROM yelplab1.login WHERE(username = '"+ info.username + "')" ;
  mysql.query(sql)
  .then( rows => {
    console.log('rows', rows);
  })
  .catch(err => {
    console.log('err',err);
  });  
  //return new Promise((res, rej) => {
  
  // if (signupUser) {
  //   var sql = 
  //   mysql.format("SELECT user_id FROM yelplab1.login WHERE(username = '"+ info.username + "')" );
  //   con.query(sql, function (err, result) {
  //      if (err) throw err;
  //      console.log( result);
  //      });
  //   }


  // if (loginUser) {
  //   console.log('inside login select query')
  //   var sql = 
  //   mysql.format("SELECT user_id FROM yelplab1.login WHERE(username = '"+ info.username + "')" );
  //   con.query(sql, function (err, result) {
  //     if (err) throw err;
  //          console.log('result', result);
  //          return result;
  //       });
  //     }
  //   });
} 
  //start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");