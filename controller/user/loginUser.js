const { findUser, updateToken } = require("../../service/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../config/passport-jwt");

const loginUser = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    const user = await findUser({ email });

    if (!user) {
      await updateToken;
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: `There is no user ${email}`,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Wrong password",
      });
    }

    user.token = generateToken(user);
    await user.save();
    res.status(200).json({
      message: "Login successful",
      token: user.token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = { loginUser };
