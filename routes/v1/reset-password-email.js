const express = require('express');
const router = express.Router();
const http = require("https");
const jwt = require('jsonwebtoken');

const queries = require('../../db/queries/user-queries');

router.post('/', function(req, res) {
  const user = { email: req.body.email }
  const options = createMailOptions();
  queries.login(user)
  .then(data => {
    let request, temporaryToken, dbUser = data[0];
    if(dbUser){ sendRecoveryEmail() }
    else {
      res.status(401).json({
        title: 'User does not exist',
        error: {message: 'User is not registered.'}
      });
    }
    return temporaryToken;
  })
  .then(temporaryToken => { saveToken(req, temporaryToken) })
  .catch(err => {
    console.error(err);
    return res.status(500).json({
      title: 'An error has occurred',
      error: err
    });
  });
});

function saveToken(req, temporaryToken) {
  queries.saveToken(req.body.email, temporaryToken, 'temp_token')
  .then()
  .catch(err => console.log(err));
}

function sendRecoveryEmail() {
  let recoveredUser = { email: req.body.email, password: dbUser.password }
  temporaryToken = jwt.sign({ recoveredUser }, process.env.JWT_SECRET, { expiresIn: 600 });
  request = http.request(options, response => {
    if(response.statusCode === 202){
      res.status(200).json({
        message: 'Reset password email successfully sent',
        data: "Email received",
      });
    }
  });

  request.write(createEmail(req, temporaryToken));

  request.end();
}

function createEmail(req, temporaryToken) {
  return JSON.stringify({ personalizations:
    [ { to: [ { email: req.body.email}]}],
    from: { email: 'no-reply@angulartemplate.com', name: 'AngularTemplate' },
    subject: 'Password Reset Link - Do Not Reply',
    content: [
      { type: 'text/html',
        value: `
          <html><p>You are receiving this email because you want to reset your Deal Maker app password.</p></html>
          <html><p>Please click on the link below to reset your password.</p></html>
          <html><a href="${process.env.URL}/#/reset-password?token=${temporaryToken}">Reset Password</a></html>`
        }
      ]
    }
  )
}

function createMailOptions() {
  return {
    "method": "POST",
    "hostname": "api.sendgrid.com",
    "port": null,
    "path": "/v3/mail/send",
    "headers": {
      "authorization": `Bearer ${process.env.SENDGRID_KEY}`,
      "content-type": "application/json"
    }
  };
}

module.exports = router;
