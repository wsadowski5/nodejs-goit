const nodemailer = require("nodemailer");
const mgTransport = require("nodemailer-mailgun-transport");
require("dotenv").config();

const { DOMAIN, MAILGUN_API_KEY } = process.env
const auth = {
  auth: {
    api_key: MAILGUN_API_KEY,
    domain:DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mgTransport(auth));

const sendVerifyEmail = (to, subject, html) => {
  const mailOptions = {
    from: "wsadowski5@gmail.com",
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.error(err);
    } else {
      console.log( info);
    }
  });
};



module.exports = { sendVerifyEmail };