const {findUserByID, } = require("../../service/user");


const logoutUser = async (req, res, next) => {
    const { id } = req.user;
    
    try {
      const user = await findUserByID({ id });
      console.log(user)
      if (user) {
        res
        .status(204)
        .json({ status: "No content", code: 204, message: "logout succesful" });
      } else {
        res
          .status(401)
          .json({ status: "Unauthorized", code: 401, message: "Not authorized" });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
  

  module.exports = {  logoutUser };