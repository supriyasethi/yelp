//import the require dependencies
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
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
    password: "password"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
var sql = "SELECT * FROM sakila.actor"
con.query(sql, function (err, result) {
      if (err) throw err;
      console.log( result);
    });


  var Users = [{
    username : "ssupriya.sethi@gmail.com",
    password : "12345"
}]

var signupForm = [
  {
    "firstname" : "Supriya", 
    "lastname"  : "Sethi", 
    "username"  : "ssupriya.sethi@gmail.com", 
    "password"  : "12345", 
    "zipcode"   : "95035"},
]

//Route to handle Post Request Call
app.post('/signup',function(req,res){
  
  console.log("Inside Signup Post Request");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Req Body : ",req.body);
  Users.filter(function(user){
      if(user.username === req.body.signupFormInfo.username){
          res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
          req.session.user = user;
          res.writeHead(422,{
              'Content-Type' : 'text/plain'
          })
          res.end("User is already registered!");
      }
      else {
          let signupinfo = {
            "firstname" : req.body.signupFormInfo.firstname, 
            "lastname"  : req.body.signupFormInfo.lastname,
            "username"  : req.body.signupFormInfo.username,
            "password"  : req.body.signupFormInfo.password,
            "zipcode"   : req.body.signupFormInfo.zipcode}
          
          let userinfo = {
            "username"  : req.body.signupFormInfo.Username,
            "password"  : req.body.signupFormInfo.Password,
          }
          
          console.log(signupinfo);
          signupForm.push(signupinfo);
          Users.push(userinfo);
          console.log("Succesfull");
          console.log(signupForm);
          res.writeHead(200,{
              'Content-Type' : 'text/plain'
          })
          res.end("User Registered Successfully!");
        }
      })
    });
  
//Route to handle Post Request Call
app.post('/login',function(req,res){
  
  console.log("Inside Login Post Request");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Req Body : ",req.body);
  Users.filter(function(user){
      if(user.username === req.body.loginFormInfo.Username && user.password === req.body.loginFormInfo.Password){
          res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
          req.session.user = user;
          res.writeHead(200,{
              'Content-Type' : 'text/plain'
          })
          res.end("Successful Login!");
          
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

// app.post('/create',[
//   check("BookID")
//     .isInt()
//     .withMessage("BookID should be numeric")
//     .not()
//     .isEmpty()
//     .withMessage("BookID is empty")
//     .custom((bookid) => {
//       var ind = findBookId(bookid);
//       if (ind === -1) {
//         return true;
//       }
//     })
//     .withMessage("BookID already exists"),
//     check("Title")
//       .not()
//       .isInt()
//       .withMessage("Title should not be numeric")
//       .not()
//       .isEmpty()
//       .withMessage("Title is empty"),
//     check("Author")
//       .not()
//       .isInt()
//       .withMessage("Author should not be numeric")
//       .not()
//       .isEmpty()
//       .withMessage("BookAuthor is empty"),
//   ],
//     function(req,res) {
//   console.log("Inside Create Post Request");
//   const errors = validationResult(req).array();
//       if (errors != '') {
//           res.writeHead(422,{
//           'Content-Type' : 'text/plain'
//    });
//    var err = JSON.stringify(errors);
//    console.log('err', err);
//    res.end(err);
//   } else {
//      let reqbook = {
//           BookID : req.body.BookID,
//           Title: req.body.Title,
//           Author: req.body.Author,
//       }   
//       books.push(reqbook);
//       books.sort((a, b) => a.BookID - b.BookID);
//       res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//       res.writeHead(200,{
//          'Content-Type' : 'text/plain'
//       })
//       res.end("Successful Create");
// }
// });

// app.post('/delete',function(req,res) {
//   console.log("Inside Delete Post Request");
//   console.log("Req Body", req.body);
//   var bookID = req.body.BookID;
//   var index = findBookId(bookID);   

//   if (index === -1) {
//       res.writeHead(422, {
//           'Content-Type' : 'text/plain'
//    });
//    res.end("BookID does not exists");
//   } else
//    {
//       books.splice(index, 1);
//       res.writeHead(200,{
//           'Content-Type' : 'text/plain'
//        })
//        res.end("Successful Delete")
//   }
// });

// function findBookId(id) {
//   var i = books.findIndex((el) => el.BookID === id);
//   return i;
// }

//Route to get All Books when user visits the Home Page
// app.get('/profile', function(req,res){
//   console.log("Inside Home Login");    
//   res.writeHead(200,{
//       'Content-Type' : 'application/json'
//   });
//   console.log("Books : ",JSON.stringify(books));
//   let profileInfo = {
//     username : 
//   }
//   res.end(JSON.stringify(books));
  
// })


  //start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");