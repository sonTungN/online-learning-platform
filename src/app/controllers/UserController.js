const User = require("../models/User");
const { mongooseToObject } = require("../../utils/mongoose");
const { hashPassword, comparePassword } = require("../../utils/helper");
const path = require("path");

class UserController {
  // [GET] /user/sign-in
  entry(req, res, next) {
    try {
      res.render("sign-in", {
        title: "Sign In",
        styles: ["sign-in.css"],
        user: req.session.user,
      });
    } catch (e) {
      next(e);
    }
  }

  // [GET] /sign-in/guest
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

  // [POST] /:email/auth
  async auth(req, res, next) {
    try {
      req.session.regenerate(function (err) {
        if (err) next(err);

        req.session.user = req.user;
        res.render("home", {
          title: "Homepage",
          styles: ["home.css", "bootstrap_v5.css"],
          isHome: true,
          user: req.session.user,
        });
        res.redirect("/");
        // res.json({ session: req.session });
      });
    } catch (e) {
      next(e);
    }
  }

  // [GET] /user/sign-up
  create(req, res, next) {
    try {
      res.render("sign-up", {
        title: "Sign Up",
        styles: ["sign-up.css"],
        user: req.session.user,
      });
    } catch (e) {
      next(e);
    }
  }

  // [POST] /:email/store
  async store(req, res, next) {
    try {
      let profileImgPath;
      if (req.file) {
        profileImgPath = path.join("/assets/uploads/", req.file.filename);
      } else {
        profileImgPath = "/assets/uploads/default.png";
      }

      const user = new User({
        ...req.body,
        createdAt: new Date(),
        password: hashPassword(req.body.password),
        profileImg: profileImgPath,
      });

      // res.json(user);
      await user
        .save()
        .then((user) => res.redirect("/user/sign-in"))
        .catch(next);
    } catch (error) {
      next(error);
    }
  }

  quit(req, res, next) {
    req.session.user = null;
    req.session.save(function (err) {
      if (err) next(err);

      req.session.destroy(function (err) {
        if (err) next(err);
        res.redirect("/");
      });
    });
  }
}

module.exports = new UserController();
