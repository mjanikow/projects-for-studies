var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const reservationRouter = require('./routes/reservationRoute');
const tableRouter = require('./routes/tableRoute');
const tableApiRouter = require('./routes/tablesApiRoute');
const clientApiRouter = require('./routes/clientApiRoutes');
const reservationApiRouter = require('./routes/ReservationApiRoute');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/tables', tableApiRouter)
app.use('/api/clients', clientApiRouter)
app.use('/api/reservations', reservationApiRouter)


app.use('/', indexRouter);
app.use('/reservations', reservationRouter);
app.use('/table', tableRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
