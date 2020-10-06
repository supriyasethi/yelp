var con = require('../connection');
const mysql = require('mysql');
const { check, validationResult } = require("express-validator");

function userprofile(res, req) {
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
}

function bizprofile(res, req) {
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
}

module.exports = {
    userprofile,
    bizprofile
}