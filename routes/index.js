var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.sendFile(path.join(__dirname, '../public/html', 'index.html'));
  //res.render('index', { title: 'Hello World' });
  res.render('index.ejs', { title: 'Houston Museum of Fine Arts' });
});

module.exports = router;
