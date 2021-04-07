var express = require('express');
var router = express.Router();
var app = express();

if (!app.locals.requests) {
  app.locals.requests = [];
}

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('allRequests', {
    title: 'All Requests',
    requests: app.locals.requests
  });
});

router.post('/', (req, res, next) => {
  var newReq = {
    name: req.body.name,
    email: req.body.email
  };
  app.locals.requests.push(newReq);
  res.render('allRequests', {
    title: 'All Requests',
    requests: app.locals.requests
  });
});

module.exports = router;
