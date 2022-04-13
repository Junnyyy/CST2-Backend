var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// routers
const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');
//const testAPIRouter = require('./routes/testAPI');
const artpieceRouter = require('./routes/artpiece');
const artpiecearchiveRouter = require('./routes/artpiecearchive');
const customerRouter = require('./routes/customer');
const departmentRouter = require('./routes/department');
const employeeRouter = require('./routes/employee');
const exhibitRouter = require('./routes/exhibit');
const galleryRouter = require('./routes/gallery');
const storeitemRouter = require('./routes/storeitem');
const storetransactionRouter = require('./routes/storetransaction');
const tickettransactionRouter = require('./routes/tickettransaction');
const reportRouter = require('./routes/report');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use('/testAPI', testAPIRouter);
app.use('/artpiece', artpieceRouter);
app.use('/artpiecearchive', artpiecearchiveRouter);
app.use('/customer', customerRouter);
app.use('/department', departmentRouter);
app.use('/employee', employeeRouter);
app.use('/exhibit', exhibitRouter);
app.use('/gallery', galleryRouter);
app.use('/storeitem', storeitemRouter);
app.use('/storetransaction', storetransactionRouter);
app.use('/tickettransaction', tickettransactionRouter);
app.use('/report', reportRouter);
app.use('/public', express.static('public'));

// catch favicon request
app.get('/favicon.ico', (req, res) => res.status(204));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
