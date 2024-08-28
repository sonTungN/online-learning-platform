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

  async auth(req, res, next) {
    try {
      req.session.regenerate(function (err) {
        if (err) next(err);

        req.session.user = req.user;

        res.json({ user: req.session.user });
      });
    } catch (e) {
      next(e);
    }
  }

  async store(req, res, next) {
    const user = new User({
      ...req.body,
      password: hashPassword(req.body.password),
    });

    // res.json(user);
    await user
      .save()
      .then((user) => res.redirect("/user/sign-in"))
      .catch(next);
  }
}

module.exports = new UserController();
