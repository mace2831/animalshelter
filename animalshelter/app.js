var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



//routes
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var animalsRouter = require('./app_server/routes/animals');
var apiRouter = require('./app_api/routes/index');
const autocompleteRouter = require('./app_server/routes/autocomplete');

var handlebars = require('hbs');
const Animal = require('./app_api/models/animals');
const { populateTrie } = require('./app_server/initializeTrie');

//bring in database
require('./app_api/models/db');

//require secret string
require('dotenv').config();

var app = express();

//wire in authentication
var passport = require('passport');
require('./app_api/config/passport');



// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));



handlebars.registerPartials(__dirname + '/app_server/views/partials');
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


//Enable CORS
app.use('/api', (req, res, next)=> {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
//use api routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/animals', animalsRouter);
app.use('/api', apiRouter);
app.use('/', autocompleteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//catch unauthorize error
app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError'){
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Populate the list
populateTrie();

//set up listener port for click events
app.listen(3001, ()=>{
});

module.exports = app;
