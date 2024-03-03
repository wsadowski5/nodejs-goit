const { sendVerifyEmail } = require("../../service/email")
const { findUser } = require("../../service/user");


const resendEmail = async (req, res, next) => {
    const { email } = req.body;
  
    let user;
    try {
     user = await findUser({ email });
    } catch (error) {
      return next(error);
    }
  
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Email not found",
        data: "Not Found",
      });
    }
  
    if (user.verify) {
      return res.status(400).json({
        status: "error",
        message: "Verification has already been passed",
        data: "Bad Request",
      });
    }
  
    try {
      await sendVerifyEmail({
        email,
        verificationToken: user.verificationToken,
      });
  
      res.status(200).json({
        status: "success",
        message: "Verification email sent",
        data: "OK",
      });
    } catch (error) {
      return next(error);
    }
  };

module.exports = { resendEmail }