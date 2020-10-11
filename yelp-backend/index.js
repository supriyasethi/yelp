//import the require dependencies
"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var redis = require('redis');
var connectRedis = require('connect-redis');
const auth = require('./middleware/auth');

//if you run behind a proxy (eg nginx)
//app.set("trust proxy", 1);

var RedisStore = connectRedis(session);
var redisClient = redis.createClient({
  port : 6379,
  host: 'localhost'
})

app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharing
//app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors({ origin: true, credentials: true }));

//use express session to maintain session data
app.use(session({
    store               : new RedisStore({client: redisClient}),
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : true, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : true, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000,
    name                : 'cookie',
    cookie              : {
          secure: false, //if true, only transmits cookie over https
          httpOnly: false, // if true: prevents client side JS from reading the cookie
          maxAge : 1000 * 60 * 30 // session max age in milliseconds
    }
}));

app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('connect').bodyParser());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  //creating the routes
const Login = require("./routes/Login");
const Signup = require("./routes/Signup");
app.use("/login", Login);
app.use("/signup", Signup);
//app.use(auth);
const Update = require("./routes/Update");
const Insert = require("./routes/Insert");
const Fetch = require("./routes/Fetch");

app.use("/update", Update);
app.use("/insert", Insert);
app.use("/get", Fetch);  


  //start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");