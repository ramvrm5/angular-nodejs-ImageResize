var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var imageRouter = require('./routes/image');

const mongoose = require('mongoose');
const cors = require('cors');

var app = express();
app.use(cors());


//CONNECT WITH MONGOOSE CODE : START
var url = "mongodb+srv://ramverma:ram123456@traversymedia.77b2f.mongodb.net/image_tumbnail?retryWrites=true&w=majority";
mongoose.connect(url, { useUnifiedTopology: true , useNewUrlParser: true}).then(result => {
  console.log('connected To Database...!!!');
})
.catch(err => {
console.log(err);
});;
//CONNECT WITH MONGOOSE CODE : END

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/image', imageRouter);

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
