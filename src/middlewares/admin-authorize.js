const User = require("../app/models/User");
const adminAuthorize = async (req, res, next) => {
  try {
    const user = req.session.user || null;
    if (!user) {
      return res.redirect("/");
    }
    const currentUser = await User.findById(user.id);
    if (currentUser.accountType !== "ADMIN") {
      return res.redirect("/");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { adminAuthorize };
