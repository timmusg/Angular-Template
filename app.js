const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
var authenticateToken = require('./middlewares/jwt-authentication');

/* Route Files Start */

//Authentication
const user = require('./routes/v1/user');
const resetPasswordEmail = require('./routes/v1/reset-password-email');
const resetPasswordInDb = require('./routes/v1/reset-password-in-db');

/* Route Files End */

const app = express();

app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(cookieParser());
app.use(cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

// Prevents robots.txt error
app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

/* Routes Start */

//Authentication
app.use('/v1/user', user);
app.use('/v1/reset-password-email', resetPasswordEmail);
app.use('/v1/reset-password-in-db', resetPasswordInDb);

/* Routes End */

// Access Dist Folder For Main Route
app.use(express.static(path.join(__dirname, 'dist')));
// Temporary favicon.ico route to stop 500 msg for favicon.ico.
// app.get('/favicon.ico', function(req, res) {
//     res.status(204);
// });
app.use(function(req, res, next) {
  // return res.render(path.resolve(__dirname, 'dist', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.error(err)
  res.status(err.status || 500);
});

module.exports = app;
