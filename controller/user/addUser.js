const { createUser, findUser } = require("../../service/user");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { sendVerifyEmail } = require("../../service/email")

const addUser = async (req, res, next) => {
  const { password, email, avatarURL } = req.body;

  try {
    const isUserExist = await findUser({ email });

    if (isUserExist) {
      res.status(409).json({
        status: "conflict",
        code: 409,
        data: `email ${email} is alredy used`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = uuidv4();
    const result = await createUser({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    await sendVerifyEmail(
      email,
      "Verify email",
      `<a a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Verify email</a>`
    );

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = { addUser };
