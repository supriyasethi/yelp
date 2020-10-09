var con = require('../connection');
const mysql = require('mysql');

function insertevent(req, res) {
    console.log("Inside Insert Event Post Request");  
  console.log("Req Body : ",req.body);    
    var sql = 
      mysql.format("INSERT INTO events (name, description, time, date, location, hashtags, restaurantId) \
               VALUES('"+req.body.eventname+"','" +req.body.description+"','" +req.body.time+"',\
               '" + req.body.date +"','" + req.body.location + "','" + req.body.hashtag +"'," + req.session.restaurantId +")");
      con.query(sql, function (err, result) {
      if (err) {          
        res.status(401).send(err);
        console.log(err);
        }
      else {
        console.log( result);              
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
      })
        res.end("Event update successful!");
          }        
        });
  }

  function inserteventregister(req, res) {
    console.log("Inside Insert Event Register Post Request");  
  console.log("Req Body : ",req.body);    
    var sql = 
      mysql.format("INSERT INTO eventsregister (eventId, restaurantId, userId) \
               VALUES("+req.body.eventId+"," +req.body.restaurantId+"," +req.session.userId+")");               
      con.query(sql, function (err, result) {
      if (err) {          
        res.status(401).send(err);
        console.log(err);
        }
      else {
        console.log( result);              
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
      })
        res.end("Event registered successfully!");
          }        
        });
  }


function insertmenu(req, res) {
    console.log("Inside Insert Menu Post Request");  
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
}

module.exports = {
    insertevent,
    insertmenu,
    inserteventregister
}