var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Assignment 5', images: [0, 1, 2, 3, 4, 5, 6, 7],
    Name: 'Hello', Email: 'World'
  });
});

module.exports = router;
