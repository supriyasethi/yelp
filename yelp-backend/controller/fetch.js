var con = require('../connection');
const mysql = require('mysql');

function fetchhome(req,res) {
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
}

function fetchmenu(req, res) {
    console.log("Inside Menu Get request"); 
  let location = req.query.location;
  let dish = req.query.keyword;
  console.log(req.session.restaurantId);
  var sql = 
    mysql.format("SELECT * FROM restaurant A INNER JOIN menu B \
          ON A.restaurantId = B.restaurantId \
          WHERE B.restaurantId = " +req.session.restaurantId);          
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
}

function fetchevent(req, res) {
  console.log("Inside Event Get request"); 
let location = req.query.location;
let dish = req.query.keyword;
console.log(req.session.restaurantId);
var sql = 
    mysql.format("SELECT * FROM events"); 
  // mysql.format("SELECT * FROM restaurant A INNER JOIN events B \
  //       ON A.restaurantId = B.restaurantId \
  //       WHERE B.restaurantId = " +req.session.restaurantId);          
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
}

function fetchuserp(res, req) {
    console.log("Inside User Profile"); 
  console.log('session.userid', req.session.userId);
  var sql = 
    mysql.format("SELECT * FROM user WHERE userId ='"+ req.session.userId + "'");
    con.query(sql, function (err, result) {
      if (err) { 
        console.log(err);         
        res.status(401).send(err);      
      } else
      {   
        res.json(req.session);
        console.log(result);
        //res.status(200).send(result);
      }
});
}

function fetchbizp(res, req) {
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
}

module.exports = {
    fetchhome,
    fetchmenu,
    fetchuserp,
    fetchbizp,
    fetchevent
}