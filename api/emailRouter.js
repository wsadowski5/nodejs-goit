const express = require("express");
const validate = require("../validator/validator");
const { verifyEmail } = require("../controller/email/verifyEmail");

const { resendEmail } = require("../controller/email/resendEmail")
const routerEmail = express.Router();


routerEmail.post("/users/verify/", validate.emailValid, resendEmail)
routerEmail.get("/users/verify/:verificationToken", verifyEmail)

module.exports = routerEmail