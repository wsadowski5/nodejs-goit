const User = require("./schemas/user");
const gravatar = require("gravatar");

const createUser = ({ email, password, verificationToken }) => {
  const avatarURL = gravatar.url(`${email}`, { s: "200", r: "pg", d: "404" });
  return User.create({ email, password, avatarURL, verificationToken });
};

const findUser = ({ email }) => {
  return User.findOne({ email });
};

const findUserByToken = ({ verificationToke }) => {
  return User.findOne({ verificationToke });
};

const updateToken = ({ email, token }) => {
  return User.findOneAndUpdate({ email }, { $set: { token } });
};

const verifyUser = ({ id } ) => {
  return User.findByIdAndUpdate({ _id: id }, { verificationToken : null, verify:true });
}
const findUserByID = ({ id }) => {
  return User.findByIdAndUpdate({ _id: id }, { token: null });
};

module.exports = {
  createUser,
  findUser,
  findUserByID,
  findUserByToken,
  updateToken,
  verifyUser,
};
