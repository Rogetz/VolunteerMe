var express = require('express');
var router = express.Router();
var dotenv = require("dotenv")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VolunteerMe' });
});

module.exports = router;
