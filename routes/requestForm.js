var express = require('express');
var router = express.Router();

/* GET request form. */
router.get('/', function (req, res, next) {
  res.render('request', { title: 'Request form' });
});

module.exports = router;
