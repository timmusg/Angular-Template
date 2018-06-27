const nodemailer = require('nodemailer');
const fs = require('fs');

module.exports = {
  sendWelcomeEmail: (email) => {
    let transporter = createMailTransporter();

    var htmlstream = fs.createReadStream('notifications/welcome.html');

    let mailOptions = {
      from: '"Angular Template Team" <donotreply@angulartemplate.com>',
      to: email,
      subject: 'Welcome to Angular Template',
      replyTo: 'support@angulartemplate.com',
      html: htmlstream
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });
  },
  createMailTransporter: () => {
    return nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
          user: 'donotreply@angulartemplate.com',
          pass: process.env.DONOTREPLY_EMAIL_PASSWORD
      },
      tls: {
          ciphers:'SSLv3'
      }
    })
  }
}
