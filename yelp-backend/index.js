//import the require dependencies
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var redis = require('redis');
var connectRedis = require('connet-redis');

//if you run behind a proxy (eg nginx)
//app.set("trust proxy", 1);

var RedisStore = connectRedis(session);
var redisClient = redis.createClient({
  port : 6379,
  host: 'localhost'
})

app.set('view engine', 'ejs');
//var mysql = require("./Database");
//require express validation to validate the fields
const { check, validationResult } = require("express-validator");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    store               : new RedisStore({client: redistClient}),
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000,
    cookie              : {
          secure: false, //if true, only transmits cookie over https
          httpOnly: true, // if true: prevents client side JS from reading the cookie
          maxAge : 1000 * 60 * 30 // session max age in milliseconds
    }
}));

app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/home', function(req,res){
    console.log("Inside Home Get request"); 
    let location = req.query.location;
    let dish = req.query.keyword;
    var sql = 
      mysql.format("SELECT * FROM restaurant A INNER JOIN menu B \
            ON A.restaurantId = B.restaurantId \
            WHERE A.city = '" +location + "' \
            AND B.dishName LIKE '%" + dish + "%'");            
      con.query(sql, function (err, result) {
        if (err) { 
          console.log(err);         
          res.status(401).send(err);      
        } else
        {    
          console.log(result);                          
          res.status(200).send(result);
        }
});
});

app.get('/userp', function(req,res){
  console.log("Inside User Profile"); 
  var sql = 
    mysql.format("SELECT * FROM user WHERE email_id ='"+ req.session.user + "'");
    con.query(sql, function (err, result) {
      if (err) { 
        console.log(err);         
        res.status(401).send(err);      
      } else
      {    
        console.log(result);          
        res.status(200).send(result);
      }
});
});

app.get('/bizp', function(req,res){
  console.log("Inside User Profile"); 
  var sql = 
    mysql.format("SELECT * FROM restaurant WHERE email_id ='"+ req.session.user + "'");
    con.query(sql, function (err, result) {
      if (err) { 
        console.log(err);         
        res.status(401).send(err);      
      } else
      {    
        console.log(result);          
        res.status(200).send(result);
      }
});
});

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
      sql = mysql.format("INSERT INTO yelplab1.login (username, password, userId) VALUES('"+ req.body.username+"','" +req.body.password+"'," + result.insertId+")");
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
app.post('/signupr',
function(req,res){
  console.log("Inside Signup Post Request");  
  console.log("Req Body : ",req.body);    
    var sql = 
      mysql.format("INSERT INTO yelplab1.restaurant (name, email_id, city) VALUES('"+req.body.name+"','" +req.body.username+"','" +req.body.city+"')");
      con.query(sql, function (err, result) {
      if (err) {          
        res.status(401).send(err);      
        }
      else {
      console.log( result);
      sql = mysql.format("INSERT INTO yelplab1.loginr (username, password, restaurantId) VALUES('"+ req.body.username+"','" +req.body.password+"'," + result.insertId+")");
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
    });   
  
//Route to handle Post Request Call
app.post('/insertevent',
function(req,res){
  console.log("Inside Signup Post Request");  
  console.log("Req Body : ",req.body);    
    var sql = 
      mysql.format("INSERT INTO events (name, description, time, date, location, hashtags, restaurantId) \
               VALUES('"+req.body.name+"','" +req.body.description+"','" +req.body.time+"') \
               " + req.body.date +"','" + req.body.location + "," + req.body.hashtags +"','" + restaurantId +"'");
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
          req.session.userId = rows[0].userId;
          res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
          req.session.user = req.body.username;
          currentUser = req.session.user;
          console.log('user', req.session.user);
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

app.use((req,res,next) => {
  if (!req.session || !req.session.userId) {
    const err = new Error('You are not logged in');
    err.statusCode = 401;
    next(err);
  }
  next();
}



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

//Route to handle Post Login Request Call
app.post('/updateuserprofile',
function(req,res){
  console.log("Inside Update User Profile Post Request");  
  console.log("Req Body : ",req.body);    
  var sql = "UPDATE user SET \
        first_name = '" + req.body.state.firstname + "', \
        last_name = '" + req.body.state.lastname + "', \
        nickname = '" + req.body.state.nickname	 + "', \
        date_of_birth = '" + req.body.state.birthday + "', \
        state = '" + req.body.state.state	 + "', \
        country = '" + req.body.state.country	+ "', \
        gender = '" + req.body.state.gender + "', \
        phone_number = '" + req.body.state.phonenumber + "', \
        yelping_since = '" + req.body.state.yelpingsince + "', \
        find_me_in = '" + req.body.state.findmein + "', \
        profile_img = '" + req.body.picture + "' \
        WHERE email_id = '"+ req.session.user +"'";
  con.query(sql,(err,rows,fields) => {  
    if (!err) {
      if(rows != '') {
        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
          req.session.user = req.body.username;
          currentUser = req.session.user;
          console.log('user', req.session.user);
          res.writeHead(200,{
              'Content-Type' : 'text/plain'
          })
          res.end("Successful Login!");
      }
      else {
           res.writeHead(401,{
              'Content-Type' : 'text/plain'
          })
          res.end("Database Error!");
      }
      console.log(rows); }
    else
      console.log(err);
  });
});

//Route to handle Post update biz profile Request Call
app.post('/updatebizprofile',
function(req,res){
  console.log("Inside Update Restaurant Profile Post Request");  
  console.log("Req Body : ",req.body);    
  var sql = "UPDATE restaurant SET \
        name = '" + req.body.state.name + "', \
        description = '" + req.body.state.description + "', \
        address = '" + req.body.state.address + "', \
        timing = '" + req.body.state.timing	 + "', \
        website = '" + req.body.state.website	+ "', \
        phonenumber = '" + req.body.state.phonenumber + "', \
        profileimg = '" + req.body.picture + "' \
        WHERE email_id = '"+ req.session.user +"'";      
        
  con.query(sql,(err,rows,fields) => {  
    if (!err) {
      if(rows != '') {
        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
          req.session.user = req.body.username;
          currentUser = req.session.user;
          console.log('user', req.session.user);
          res.writeHead(200,{
              'Content-Type' : 'text/plain'
          })
          res.end("Successful Insert!");
      }
      else {
           res.writeHead(401,{
              'Content-Type' : 'text/plain'
          })
          res.end("Database Error!");
      }
      console.log(rows); }
    else
      console.log(err);
  });
});


//Route to handle Post insertMenu Request Call
app.post('/insertmenu',
function(req,res){
  console.log("Inside Update Menu Post Request");  
  console.log("Req Body : ",req.body);    
  var sql = "SELECT restaurantId FROM restaurant WHERE email_id = '" + req.session.user + "'";
  console.log(sql);
  con.query(sql, (err, rows, fields) => {
    if (err) {        
       console.log('Update Error');
        res.writeHead(401,{
          'Content-Type' : 'text/plain'
        })
        res.end("Database Error in Select!");
      }
      else {
        console.log(rows[0].restaurantId);
        if(rows != '') {
                  sql = "INSERT INTO yelplab1.menu \
                         (dishName, ingredients, price, description, category, restaurantId) VALUES( \
                        '"+req.body.dishname+"','" + req.body.ingredients+"'," +req.body.price+",\
                        '" +req.body.description+"','"+req.body.category+"',"+ rows[0].restaurantId +")";                                         
                      con.query(sql,(err,rows,fields) => {  
                     if (!err) {
                       if(rows != '') {
                        console.log('Update done');
                        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});                                    
                        res.writeHead(200,{
                          'Content-Type' : 'text/plain'
                      })
                    res.end("Successful Update!");
                }
                else {
                     console.log('Update Error');
                     res.writeHead(401,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Database Error in Update!");
                }
                console.log(rows); }
              else
                console.log(err);
            });
        }
      }
    });  
});  
  //start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");