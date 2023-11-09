var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotnev = require("dotenv").config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var forgotRouter = require("./routes/forgotPassword")
var loginRouter = require("./routes/login")
var registrationRouter = require("./routes/registration")
var otpVerification = require("./routes/otpVerification")

// custom modules
const databaseHandler = require("./lib/databaseHandler")// for database

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post("/forgotPassword",function(req,res,next){
  databaseHandler.updatePassword(req.body.Email,req.body.Password,function(err,message){
    if(err){
      console.log(err)
      res.render("Login")
    }
    else{
      console.log("succesful password change")
      res.render("Login")
    }
  })
})

app.use("/registration",registrationRouter)
app.use("/login",loginRouter)
app.use("/forgotPassword",forgotRouter)
app.use("/otpVerification",otpVerification)
app.use('/',indexRouter);
app.use('/users', usersRouter);

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
