const User = require("../models/User");
const { mongooseToObject } = require("../../utils/mongoose");
const { hashPassword, comparePassword } = require("../../utils/helper");

class UserController {
  create(req, res, next) {
    try {
      res.render("sign-up", {
        title: "Sign Up",
        styles: ["sign-up.css"],
      });
    } catch (e) {
      next(e);
    }
  }

  entry(req, res, next) {
    try {
      res.render("sign-in", {
        title: "Sign In",
        styles: ["sign-in.css"],
      });
    } catch (e) {
      next(e);
    }
  }

  guest(req, res, next) {
    try {
      req.session.regenerate(function (err) {
        if (err) next(err);

        req.session.user = {
          id: "guest-" + Date.now(),
          email: "guest@example.com",
          firstName: "Guest",
          lastName: "User",
          accountType: "GUEST",
        };

        res.json({ session: req.session });
      });
    } catch (e) {
      next(e);
    }
  }

  async auth(req, res, next) {
    try {
      req.session.regenerate(function (err) {
        if (err) next(err);

        req.session.user = req.user;

        res.json({ session: req.session });
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
