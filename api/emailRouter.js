const express = require("express");
const { verifyEmail } = require("../controller/email/verifyEmail");
const { sendVerifyEmail } = require("../controller/email/sendVerifyEmail")
const routerEmail = express.Router();



routerEmail.post("/verify/", sendVerifyEmail)
routerEmail.get("/verify/:verificationToken", verifyEmail)

module.exports = routerEmail