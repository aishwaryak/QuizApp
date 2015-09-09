var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql      = require('mysql');

//Connectin to MYSQL Database
/*var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'sampledb'
});*/

var connection = mysql.createConnection({
    host     : 'mysql-instance2.ckjgb2zflews.us-east-1.rds.amazonaws.com',
    user     : 'root',
    password : 'aishwarya',
    database : 'sampledb',
    port:'3306'
});

connection.connect();

/* Called on posting the answers - url is 'formsend' */
router.post('/', function(req, res) {

  //username from the session object
  var usernameValue = req.session.username;

  //The three answers and the feedback provided.
  var answer1 = req.body.youranswers1;
  var answer2 = req.body.youranswers2;
  var answer3 = req.body.youranswers3;
  var feedback1 = req.body.feedback1;
  var feedback2 = req.body.feedback2;
  var feedback3 = req.body.feedback3;

  //Form the data to be written into DB
  var data = {
      username:usernameValue,
      answer1:answer1,
      answer2:answer2,
      answer3:answer3,
      feedback1:feedback1,
      feedback2:feedback2,
      feedback3:feedback3
    };
    
    //Query for writing data into DB
    var query = connection.query("INSERT INTO user_answers set ? ",data, function(err, rows)
    {
      if (err)
          console.log("Error inserting : %s ",err );
      
    });
    //res.send('You sent "' + completeString + '".');
    res.send('success');
});

module.exports = router;  
