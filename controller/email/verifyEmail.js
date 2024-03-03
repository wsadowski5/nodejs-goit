const { findUserByToken, verifyUser } = require("../../service/user");


const verifyEmail = async (req, res) => {
    try {
      const token = req.params.verificationToken;
      const user = await findUserByToken({ verificationToken: token });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        await verifyUser(user.id);
        res.status(200).json({ message: "Verification successful" });
      }
    } catch (error) {
      console.log(`Error: ${error.message}`.red);
    }
  };

 module.exports = {verifyEmail}