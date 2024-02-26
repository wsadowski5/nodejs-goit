const express = require("express");
const routerUser = express.Router();
const validate = require("../validator/validator");
const { auth } = require("../config/passport-jwt");

const { addUser } = require("../controller/user/addUser");
const { loginUser } = require("../controller/user/loginUser");
const { logoutUser } = require("../controller/user/logoutUser");
const { getCurrentUser } = require("../controller/user/getCurrentUser");
const { uploadAvatar } = require("../controller/avatar");
const { upload } = require("../config/multer");

routerUser.post("/users/signup", validate.userValid, addUser);
routerUser.post("/users/login", validate.userValid, loginUser);
routerUser.get("/users/logout", auth, logoutUser);
routerUser.get("/users/current", auth, getCurrentUser);
routerUser.patch(
  "/users/avatars",
  auth,
  upload.single("picture"),
  uploadAvatar
);

module.exports = routerUser;
