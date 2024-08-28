const User = require("../models/User");
const { mongooseToObject } = require("../../utils/mongoose");
const { hashPassword, comparePassword } = require("../../utils/helper");

class UserController {
  create(req, res, next) {
    res.render("sign-up", {
      title: "Sign Up",
      styles: ["sign-up.css"],
    });
  }

  entry(req, res, next) {
    res.render("sign-in", {
      title: "Sign In",
      styles: ["sign-in.css"],
    });
  }

  // async auth(req, res, next) {
  //   try {
  //     const matchedUser = await User.findOne({ email: req.body.email });
  //     if (matchedUser) {
  //       // Compare the hashed password
  //
  //       const isPasswordValid = comparePassword(
  //         req.body.password,
  //         matchedUser.password,
  //       );
  //       if (isPasswordValid) {
  //         res.render("home");
  //       } else {
  //         res.send("Wrong Password");
  //       }
  //     } else {
  //       res.send("User not found");
  //     }
  //   } catch (error) {
  //     res.send("An error occurred");
  //   }
  // }

  async store(req, res, next) {
    const user = new User({
      ...req.body,
      password: hashPassword(req.body.password),
    });

    // res.json(user);
    await user
      .save()
      .then((user) => res.json(user))
      .catch(next);
  }
}

module.exports = new UserController();
