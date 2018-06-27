const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const queries = require('../../db/queries/user-queries');

router.post('/', function (req, res, next) {

  const token = req.body.token;
  const	password = bcrypt.hashSync(req.body.password, 10);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        title: 'Reset expired',
        error: {message: 'Resend email.'}
      });
    } else {
      queries.resetPassword(token, password)
      .then( data  => {
        res.status(201).json({
          message: 'Password Changed',
          obj: data.message
        });
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      });
    }
  });

});

module.exports = router;
