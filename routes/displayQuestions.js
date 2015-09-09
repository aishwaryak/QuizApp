var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql      = require('mysql');

//Connectin to MYSQL Database
var connection = mysql.createConnection({
    host     : ' mysql-instance2.ckjgb2zflews.us-east-1.rds.amazonaws.com',
    user     : 'root',
    password : 'aishwarya',
    database : 'sampledb',
    port:'3306'
});

connection.connect();

/* Called on posting the answers - url is 'enter' */
router.all('/', function(req, res, next) {

  var usernameFromSession = req.session.username;
  var roleFromSession = req.session.role;

  var username = req.body.username;
  var password = req.body.password;

  if (typeof username == 'undefined' && (typeof usernameFromSession == 'undefined' || usernameFromSession === "" || usernameFromSession === undefined))  {
    //User is not authenticated.
    res.render('index');
  }
  else if (typeof username != 'undefined' && (typeof usernameFromSession == 'undefined' || usernameFromSession === "" || usernameFromSession === undefined))  {
    //Check if the user name and password is valid.
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?',[username,password],function(err,rows)
          {
              if(typeof rows == 'undefined' || rows.length <=0 ) {
                //No rows returned
                res.render('index', { error: 'Invalid username or password!'});
              }
              else {
                //Rows are returned
                //Set the user in session
                req.session.username = username;

                var role = rows[0].role;
                //Check if he is an admin or a normal user
                  if(role === "admin") {
                      displayAdmin(res);
                      req.session.role = "admin";
                      console.log("setting "+req.session.role);

                  } else {
                      selectQuestions(res);
                      req.session.role="user";
                      console.log("setting "+req.session.role);

                  }
                }
              if(err) {
                  console.log("Error Selecting : %s ",err );
                  res.render('index', { error: 'Some error occured. Please try again.'});
              }
           });
    }
    else if (typeof usernameFromSession != 'undefined' && roleFromSession === "user") {
      //User is authenticated.
      selectQuestions(res);
    }
    else if (typeof usernameFromSession != 'undefined' && roleFromSession === "admin") {
      //Admin is authenticated.
      displayAdmin(res);
    }
});

/** Function for normal users - To retrieve questions from the DB and display*/
function selectQuestions(res) {
  //Query from selecting questions from the questions_table and send it as 'myData'
  connection.query('SELECT * from questions_table', function(err, rows, fields) {
    if (!err) {
      var myData = JSON.stringify(rows);
      res.render('displayQuestions', {myData:rows })
    }
    else {
      console.log('Error while performing Query.');
      res.render('displayQuestions', { error: 'Some error occured. Please try again.'});
    }
    
  });
}

/** Function for admin level users - To display the answers and feedback by other users. */
function displayAdmin(res) {
  //Query from selecting user feedback from the user_answers and send it as 'myData'
  connection.query('SELECT * from user_answers', function(err, rows, fields) {
    if (!err) {
      var myData = JSON.stringify(rows);
      res.render('admin',{myData:rows });
    }
    else {
      console.log('Error while performing Query.');
      res.render('admin', { error: 'Some error occured. Please try again.'});
    }
  });
} 

module.exports = router;
