const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Auth
module.exports = (req, res, next) => {
  if(process.env.JWT_CHECK == 'true') {
    let client_jwt = req.headers['authorization'];
    client_jwt = client_jwt.substr(client_jwt.indexOf(' ') + 1);
    jwt.verify(client_jwt, process.env.JWT_SECRET, (err, decoded) => {
      if (err && err.name === 'TokenExpiredError') {
        console.log(err);
        return res.status(401).json({
          title: 'Not authenticated',
          error: {message: 'Login again.'}
        });
      }
      if (err) {
        return res.status(401).json({
          title: 'Not authenticated',
          error: err
        });
      }
      next();
    })
  } else {
      next()
  }
};
