//import the require dependencies
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
//var mysql = require("./Database");
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

  
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "yelplab1"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });


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


app.get('/userprofile', function(req,res){
    console.log("Inside User Profile");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Books : ",JSON.stringify(books));
    res.json({username: req.session.username});
    
})


//Route to handle Post Request Call
app.post('/signup',[check("firstname")
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
function(req,res){
  console.log("Inside Signup Post Request");  
  console.log("Req Body : ",req.body);  
  const errors = validationResult(req).array();
  if (errors != '') {
    var err = JSON.stringify(errors);
    console.log('err', err);
    res.writeHead(422,{
      'Content-Type' : 'text/plain'
  }); 
  res.end(err);
  } 
  else {  
    var sql = 
      mysql.format("INSERT INTO yelplab1.user (first_name, last_name, email_id, city) VALUES('"+req.body.firstname+"','" + req.body.lastname+"','" +req.body.username+"','" +req.body.city+"')");
      con.query(sql, function (err, result) {
      if (err) {          
        res.status(401).send(err);      
  }
      else {
      console.log( result);
      sql = mysql.format("INSERT INTO yelplab1.login (username, password) VALUES('"+ req.body.username+"','" +req.body.password+"')");
      con.query(sql, function (err, result) {
        if (err) {         
        res.status(401).send(err);
        }
          else {
            console.log( result);
            res.writeHead(200,{
              'Content-Type' : 'text/plain'
          })
            res.end("Signup successful!");
          }        
        });
       }
     });          
    }
});  


//Route to handle Post Request Call
app.post('/signupr',[check("firstname")
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
function(req,res){
  console.log("Inside Signup Post Request");  
  console.log("Req Body : ",req.body);  
  const errors = validationResult(req).array();
  if (errors != '') {
    var err = JSON.stringify(errors);
    console.log('err', err);
    res.writeHead(422,{
      'Content-Type' : 'text/plain'
  }); 
  res.end(err);
  } 
  else {  
    var sql = 
      mysql.format("INSERT INTO yelplab1.restaurant (first_name, last_name, email_id, city) VALUES('"+req.body.firstname+"','" + req.body.lastname+"','" +req.body.username+"','" +req.body.city+"')");
      con.query(sql, function (err, result) {
      if (err) {          
        res.status(401).send(err);      
  }
      else {
      console.log( result);
      sql = mysql.format("INSERT INTO yelplab1.loginr (username, password) VALUES('"+ req.body.username+"','" +req.body.password+"')");
      con.query(sql, function (err, result) {
        if (err) {         
        res.status(401).send(err);
        }
          else {
            console.log( result);
            res.writeHead(200,{
              'Content-Type' : 'text/plain'
          })
            res.end("Signup successful!");
          }        
        });
       }
     });          
    }
});



//Route to handle Post Login Request Call
app.post('/login',[check("username")
.exists()
.withMessage("Username is required")
.isEmail()
.withMessage("Username should be email"),
check("password")
.exists()
.withMessage("Password is required")],
function(req,res){
  console.log("Inside Login Post Request");  
  console.log("Req Body : ",req.body);
  loginUser = true;
  const errors = validationResult(req).array();
  if (errors != '') {
    var err = JSON.stringify(errors);
    console.log('err', err);
    res.writeHead(422,{
      'Content-Type' : 'text/plain'
  }); 
  res.end(err);
  } else {
  con.query("SELECT * FROM login WHERE (username = '"+ req.body.username + "' AND password = '"+ req.body.password+"')" ,(err,rows,fields) => {
    if (!err) {
      if(rows != '') {
        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
          req.session.user = req.body.username;
          res.writeHead(200,{
              'Content-Type' : 'text/plain'
          })
          res.end("Successful Login!");
      }
      else {
           res.writeHead(401,{
              'Content-Type' : 'text/plain'
          })
          res.end("Invalid Username & Password!");
      }
      console.log(rows); }
    else
      console.log(err);
  });
}
});  

//Route to handle Post Login Request Call
app.post('/loginr',[check("username")
.exists()
.withMessage("Username is required")
.isEmail()
.withMessage("Username should be email"),
check("password")
.exists()
.withMessage("Password is required")],
function(req,res){
  console.log("Inside Login Post Request");  
  console.log("Req Body : ",req.body);
  loginUser = true;
  const errors = validationResult(req).array();
  if (errors != '') {
    var err = JSON.stringify(errors);
    console.log('err', err);
    res.writeHead(422,{
      'Content-Type' : 'text/plain'
  }); 
  res.end(err);
  } else {
  con.query("SELECT * FROM loginr WHERE (username = '"+ req.body.username + "' AND password = '"+ req.body.password+"')" ,(err,rows,fields) => {
    if (!err) {
      if(rows != '') {
        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
          req.session.user = req.body.username;
          res.writeHead(200,{
              'Content-Type' : 'text/plain'
          })
          res.end("Successful Login!");
      }
      else {
           res.writeHead(401,{
              'Content-Type' : 'text/plain'
          })
          res.end("Invalid Username & Password!");
      }
      console.log(rows); }
    else
      console.log(err);
  });
}
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

  //start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");