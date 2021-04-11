const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

var indexRouter = require('./routes/index');
var requestFormRouter = require('./routes/requestForm');
var allRequestsRouter = require('./routes/allRequests');
var menuRouter = require('./routes/menu');
var apiMenuRouter = require('./routes/api-menu');

const app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.gpujc.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .catch((err) => {
        console.error(`database connection error: ${err}`);
        process.exit();
    });

// following cookieParser and Session use are required for Flash message
app.use(cookieParser('cscie31-assignment4'));
app.use(session({
    secret: "cscie31",
    resave: "true",
    saveUninitialized: "true"
}));

// using body parser to get data from form
app.use(bodyparser.urlencoded({ extended: false }));

// Handles json data when REST API is called
//if we dont use,  it will display html page source.
app.use(express.json());

//favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//view engine pug setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/request', requestFormRouter);
app.use('/allrequests', allRequestsRouter);
app.use('/menu', menuRouter);
app.use('/api/menu', apiMenuRouter);

// catch 404 and forward to error handler - copied from experess generated project
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler - copied from experess generated project
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;