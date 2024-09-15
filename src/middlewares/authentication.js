const User = require("../app/models/User");
const Cart = require("../app/models/Cart");
const { mongooseToObject } = require("../utils/mongoose");
const { comparePassword } = require("../utils/helper");

const authenticate = async (req, res, next) => {
  try {
    const matchedUser = await User.findOne({ email: req.params.email });
    // Find the user's cart and get the length of courses in the cart
    if (!matchedUser) {
      res.status(400).json({ message: "User not found..." });
    }
    const matchedUserObj = mongooseToObject(matchedUser);
    const storedPassword = matchedUserObj.password;
    // Check if the user has a cart, if not, create one
    let cart = await Cart.findOne({ user: matchedUserObj._id });
    if (!cart) {
      // If no cart exists, create a new cart for the user
      cart = new Cart({
        user: matchedUserObj._id,
        courses: [], // Empty cart initially
      });
      await cart.save(); // Save the new cart
    }

    const cartLength = cart.courses.length || 0;

    if (!comparePassword(req.body.password, storedPassword)) {
      return res
        .status(400)
        .json({ message: "Passwords don't match. Authentication failed..." });
    }
    req.user = {
      id: matchedUserObj._id,
      email: matchedUserObj.email,
      displayName: matchedUserObj.firstName + " " + matchedUserObj.lastName,
      displayImg: matchedUserObj.profileImg,
      accountType: matchedUserObj.accountType,
      profileLink:
        matchedUserObj.accountType === "LEARNER"
          ? "/learner/profile"
          : "/instructor/profile",
      cartLength,
    };
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { authenticate };
