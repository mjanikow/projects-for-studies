var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {   //to przekazuje sciezke do polaczenia sie np http://localhost:3000/
  res.render('index', { navLocation: 'main' });
});

module.exports = router;
