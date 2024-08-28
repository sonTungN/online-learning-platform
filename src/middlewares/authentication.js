const User = require("../app/models/User");
const { mongooseToObject } = require("../utils/mongoose");
const { comparePassword } = require("../utils/helper");

const authenticate = async (req, res, next) => {
  try {
    const matchedUser = await User.findOne({ email: req.params.email });
    if (!matchedUser) {
      res.status(400).json({ message: "User not found..." });
    }

    const matchedUserObj = mongooseToObject(matchedUser);
    const storedPassword = matchedUserObj.password;
    if (!comparePassword(req.body.password, storedPassword)) {
      return res
        .status(400)
        .json({ message: "Passwords don't match. Authentication failed..." });
    }

    req.user = {
      id: matchedUserObj._id,
      email: matchedUserObj.email,
    };
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { authenticate };
