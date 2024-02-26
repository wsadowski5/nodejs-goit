const User = require("../service/schemas/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const AVATARS_DIR = path.join(__dirname, "../", "public", "avatars");

const uploadAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { email } = req.user;
  const imageName = `${email}_${originalname}`;

  try {
    await Jimp.read(tempUpload)
      .then((image) => {
        return image.resize(250, 250).write(tempUpload);
      })
      .catch((err) => {
        console.error(err);
      });

    const resultUpload = path.join(AVATARS_DIR, imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    await User.findOneAndUpdate({ email }, { $set: { avatarURL } });
    res.json({
      status: "OK",
      code: 200,
      message: "Avatar has been updated",
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = { uploadAvatar };
