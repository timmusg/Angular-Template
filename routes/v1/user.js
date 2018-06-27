const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const queries = require('../../db/queries/user-queries');
const {sendWelcomeEmail} = require('../../api-functions/user-func');

router.post('/signup', function (req, res, next) {
  const user = createUserObject(req);

  queries.getUserSettings(req.body.user.email).then(settings => {
    let userObject = {
      settings,
      user
    }
    if(req.body.application == 'ep') {
      signupWithCWCredentials(userObject, req, res);
    } else {
      signupWithNewCredentials(userObject, req, res);
    }
  })
});

router.post('/login', function (req, res, next) {
  const user = { email: req.body.email, password: req.body.password }
  queries.login(user)
  .then(data => {
    let dbUser = data[0];
    checkLoginErrors(dbUser, req, res);

    let token = jwt.sign({ user }, process.env.JWT_SECRET);
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    queries.logLogin(user.email, ip).then(response => {
      queries.getUserSettings(req.body.email).then(settings => {
        settings = deleteUnnecessarySettings(settings);
        let finalLoginObject = createFinalLoginResponse(token, dbUser, settings)
        res.status(200).json(finalLoginObject);
      })
    })
  })
  .catch(err => {
    return res.status(500).json({ title: 'An error has occurred', error: err });
  });
});

// router.post('/login/google', function (req, res, next) {
//   const user = {
//     email: req.body.email
//   }
//
//   let loginData = queries.checkLoginAmount(req.body.email)
//   .then(loginData => {
//     if(loginData.length == 0) {
//       let newUser = {
//         email: req.body.email,
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         password: ''
//       }
//
//       sendWelcomeEmail(req.body.email);
//
//       queries.getUserSettings(req.body.email).then(settings => {
//         if(req.body.application == 'ep') {
//           if(settings && settings[0] && settings[0].ep_access_level == 5) {
//             queries.grantAccess('ep_access_level', req.body.user.email)
//             .then(data => {
//               return res.status(500).json({
//                 title: 'Thank you for signing up for Angular Template. Please wait for an administator to review your account and grant you access.',
//                 error: 'Not really an error'
//               });
//             })
//           } else {
//             queries.addUserEP(newUser, 'google').then();
//           }
//         } else {
//           if(settings && settings[0] && settings[0].ep_access_level == 5) {
//             queries.grantAccess('ep_access_level', req.body.user.email)
//             .then(data => {
//               return res.status(500).json({
//                 title: 'Thank you for signing up for Angular Template. Please wait for an administator to review your account and grant you access.',
//                 error: 'Not really an error'
//               });
//             })
//           } else {
//             let field = '';
//             if(req.body.application == 'dm') {
//               field = 'dm_access';
//             } else if (req.body.application == 'dcc') {
//               field = 'dcc_access';
//             }
//             queries.addUser(newUser, 'google', field).then();
//           }
//         }
//       })
//     }
//
//     let token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: "45d"});
//
//     var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//
//     queries.logLogin(req.body.email, ip).then(response => {
//       queries.getUserSettings(req.body.email).then(settings => {
//
//         settings = deleteUnnecessarySettings(settings);
//
//         checkAccessLevel(settings, req, res);
//
//         res.status(200).json({
//           message: 'Successfully logged in',
//           token: token,
//           firstName: req.body.first_name,
//           email: req.body.email,
//           settings: settings
//         });
//       })
//     })
//   })
// });

router.post('/toggleSetting', function (req, res, next) {
  queries.getUserSettings(req.body.email).then(data => {
    if(data[0].two_factor_auth == '0' && data[0].two_factor_secret == 'null') {
      return generateSecretandResponse(data);
    }

    queries.toggleSetting(req.body.email, req.body.setting).then(response => {
      res.status(200).json({ message: 'Successfully toggled setting' });
    })
  })
});

router.post('/confirmCode', function (req, res, next) {
  if(!req.body.initial) {
    queries.getUserSettings(req.body.email).then(data => {
      let verified = createQRCode(data[0].two_factor_secret, req.body.code);
      res.status(200).json({ message: 'Code successfully verified', body: verified });
    })
  } else {
    let verified = createQRCode(req.body.two_factor_secret, req.body.code);

    saveToken(verified, req)
    res.status(200).json({
      message: 'Code successfully verified',
      body: verified
    });
  }
});

function signupWithNewCredentials(userObject, req, res) {
  if(userObject.settings && userObject.settings[0] && userObject.settings[0].ep_access_level == 5) {
    grantAccessToApplication(req, res);
  } else {
    let field = '';
    if(req.body.application == 'dm') {
      field = 'dm_access';
    } else if (req.body.application == 'dcc') {
      field = 'dcc_access';
    }

    queries.addUser(userObject.user, 'AngularTemplate', field)
    .then( data  => {
      sendWelcomeEmail(userObject.user.email);

      res.status(201).json({
        message: 'User created',
        obj: data
      })
    })
    .catch(err => {
      if(err.code === "ER_DUP_ENTRY") err = {message: 'User already registered'};
      console.error(err);
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    });
  }
}

function signupWithCWCredentials(userObject, req, res) {}

function addUserWithCWAccess(user, res) {
  queries.addUserEP(user, 'AngularTemplate')
  .then(data => {
    //Needs to be more specific than this
    if(!data) {
      let err = {message: 'User already registered'};
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    sendWelcomeEmail(user.email);

    res.status(201).json({
      message: 'User created',
      obj: data
    })
  })
}

function grantAccessToApplication(req, res) {
  queries.grantAccess('ep_access_level', req.body.user.email)
  .then(data => {
    return res.status(500).json({
      title: 'Thank you for signing up for Angular Template. Please wait for an administator to review your account and grant you access.',
      error: 'Not really an error'
    });
  })
}

function createUserObject(req) {
  return {
		first_name: req.body.user.firstName,
		last_name:  req.body.user.lastName,
		password:  bcrypt.hashSync(req.body.user.password, 10),
		email:     req.body.user.email
	}
}

function createFinalLoginResponse(token, dbUser, settings) {
  return {
    message: 'Successfully logged in',
    token: token,
    firstName: dbUser.first_name,
    lastName: dbUser.last_name,
    email: dbUser.email,
    settings: settings[0],
    privilege_level: dbUser.ep_access_level
  }
}

function checkLoginErrors(dbUser, req, res) {
  if (dbUser === undefined) {
    return res.status(401).json({
      title: 'Login failed',
      error: {message: 'Invalid login credentials'}
    });
  } else if (!bcrypt.compareSync(req.body.password, dbUser.password)) {
    return res.status(401).json({
      title: 'Login failed',
      error: {message: 'Invalid login credentials'}
    });
  }
  checkAccessErrors(dbUser, res);
}

function checkAccessErrors(dbUser, res) {
  if (dbUser.ep_access_level == 4){
    return res.status(401).json({
      title: 'Login failed',
      error: {message: 'Awaiting Admin Authorization'}
    });
  } else if (dbUser.ep_access_level == 6) {
    return res.status(401).json({
      title: 'Login failed',
      error: {message: 'Your access has been temporarily suspended'}
    });
  } else if (dbUser.ep_access_level == 5) {
    return res.status(401).json({
      title: 'Login failed',
      error: {message: 'You have not registered for this application. Go to signup in order to obtain access.'}
    });
  }
}

function checkAccessLevel(settings, req, res) {
  if (settings[req.body.application + '_access'] == 4){
    return res.status(401).json({
      title: 'Login failed',
      error: {message: 'Awaiting Admin Authorization'}
    });
  } else if (settings[req.body.application + '_access'] == 6) {
    return res.status(401).json({
      title: 'Login failed',
      error: {message: 'Your access has been temporarily suspended'}
    });
  } else if (settings[req.body.application + '_access'] == 5) {
    return res.status(401).json({
      title: 'Login failed',
      error: {message: 'You have not registered for this application. Go to signup in order to obtain access.'}
    });
  }
}

function deleteUnnecessarySettings(settings) {
  delete settings[0].password;
  delete settings[0].two_factor_secret;
  delete settings[0].created_date;
  delete settings[0].modified_date;
  delete settings[0].temp_token;
  delete settings[0].user_admin_id;
  return settings;
}

function createQRCode(secret, token) {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token
  });
}

function saveToken(verified, req) {
  if(verified) {
    queries.saveToken(req.body.email, req.body.two_factor_secret, 'two_factor_secret').then(response => {
      queries.toggleSetting(req.body.email, 'two_factor_auth').then();
    });
  }
}

function generateSecretandResponse(data) {
  let secret = speakeasy.generateSecret({name: 'C2F - Angular Template'});
  QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
    res.status(200).json({
      message: 'Successfully toggled setting',
      body: data,
      qrcode: data_url,
      secret: secret.base32
    });
  });
}

module.exports = router;
