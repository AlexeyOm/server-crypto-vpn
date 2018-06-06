var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let bodyParser = require ('body-parser');
let cors = require('cors');
let generate = require('./source/generateOVPN');

var indexRouter = require('./source/routes/index');
var usersRouter = require('./source/routes/users');

var getInvoice = require('./source/routes/getInvoice');
var download = require('./source/routes/download');
var ispaid = require('./source/routes/ispaid');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

app.use(bodyParser.urlencoded({ limit : "100kb"}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/getinvoice', getInvoice);
app.use('/download', download);
app.use('/ispaid', ispaid);

//app.use('/', express.static('public'));
app.use('*', express.static('public'));
//app.use('/', indexRouter);

//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//generate('59afc4a3-0d33-47e1-8f87-893e3cfb453c_4');

module.exports = app;
