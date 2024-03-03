const nodemailer = require("nodemailer");
const mgTransport = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: "387aa5aaad6ae11c45b575df04194119-b7b36bc2-1f1a7216",
    domain:
      "sandbox3a7315f6f2444a39a64e678663cc49a4.mailgun.org",
  },
};

const transporter = nodemailer.createTransport(mgTransport(auth));

// Funkcja do wysyłania e-maili
const sendVerifyEmail = (to, subject, html) => {
  const mailOptions = {
    from: "wsadowski5@gmail.com",
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.error("Błąd wysyłania e-maila:", err);
    } else {
      console.log("E-mail został wysłany:", info);
    }
  });
};



module.exports = { sendVerifyEmail };
