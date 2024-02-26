const User = require("./schemas/user");
const gravatar = require("gravatar");

const createUser = ({ email, password }) => {
  const avatarURL = gravatar.url(`${email}`, { s: "200", r: "pg", d: "404" });
  return User.create({ email, password, avatarURL });
};

const findUser = ({ email }) => {
  return User.findOne({ email });
};

const updateToken = ({ email, token }) => {
  return User.findOneAndUpdate({ email }, { $set: { token } });
};

const findUserByID = ({ id }) => {
  return User.findByIdAndUpdate({ _id: id }, { token: null });
};

module.exports = {
  createUser,
  findUser,
  findUserByID,
  updateToken,
};
