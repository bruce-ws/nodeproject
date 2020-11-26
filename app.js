var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');
var session = require('cookie-session');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));


// cookieSession应用  当use  cookieSession中间件之后  req上面会带有一个session属性
app.use(session({
  name: 'sessionws',
  //keys: [/* secret keys */],
  secret : 'nodetest',
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 最大存储时间
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))



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
