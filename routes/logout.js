var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* Called on posting the answers - url is 'enter' */
router.get('/', function(req, res, next) {
	console.log("Logout");
	req.session.destroy();
	res.render('index', { error: 'Successfully logged out.'});
	//res.send({redirect: '/index'});
});

module.exports = router;