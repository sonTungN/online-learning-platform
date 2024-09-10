const User = require("../models/User");
const { mongooseToObject } = require("../../utils/mongoose");
const { hashPassword, comparePassword } = require("../../utils/helper");
const path = require("path");
const transporter = require('../../config/db/nodemailer');
const crypto = require('crypto');
const { promisify } = require('util');
const randomBytesAsync = promisify(crypto.randomBytes);
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');



class UserController {
  // [GET] /user/sign-in
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

  // Render the forgot password page
  showForgotPassword(req, res, next) {
    res.render('forgot-password', {
      title: "Forgot Password",
      styles: ["forgot-password.css"],
    });
  }

  // Handle forgot password form submission
  async forgotPassword(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.send("No account with that email address exists.");
      }

      const token = (await randomBytesAsync(20)).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();

      const mailOptions = {
        to: user.email,
        from: 'sinh2412004@gmail.com',
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/user/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };

      await transporter.sendMail(mailOptions);
      res.send("An e-mail has been sent to " + user.email + " with further instructions.");
    } catch (error) {
      console.error('Forgot password error:', error);
      next(error);
    }
  }

  // Render the reset password page
  async showResetPassword(req, res, next) {
    try {
      const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.send("Password reset token is invalid or has expired.");
      }

      res.render('reset-password', {
        title: "Reset Password",
        styles: ["reset-password.css"],
        token: req.params.token,
      });
    } catch (error) {
      console.error('Show reset password error:', error);
      next(error);
    }
  }

  // Handle reset password form submission
  async resetPassword(req, res, next) {
    try {
      const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.send("Password reset token is invalid or has expired.");
      }

      if (req.body.password === req.body.confirmPassword) {
        user.password = await bcrypt.hash(req.body.password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.send("Your password has been updated!");
      } else {
        res.send("Passwords do not match.");
      }
    } catch (error) {
      console.error('Reset password error:', error);
      next(error);
    }
  }
}

module.exports = new UserController();
