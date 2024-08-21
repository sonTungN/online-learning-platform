const User = require("../models/User");
const { mongooseToObject } = require("../../utils/mongoose");

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
      const matchedUser = await User.findOne({ email: req.body.email });
      if (mongooseToObject(matchedUser).password === req.body.password) {
        res.render("home");
      } else {
        res.send("Wrong Password");
      }
    } catch (error) {
      res.send("Wrong details");
    }
  }

  async store(req, res, next) {
    const data = {
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      profileImg: req.body.profileImg,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      zipCode: req.body.zipCode,
      country: req.body.country,
      accountType: req.body.accountType,
      schoolName:
        req.body.accountType === "instructor" ? req.body.schoolName : undefined,
      jobTitle:
        req.body.accountType === "instructor" ? req.body.jobTitle : undefined,
      specialization:
        req.body.accountType === "instructor"
          ? req.body.specialization
          : undefined,
    };
    await User.insertMany([data]);
    res.redirect("/");
  }
}

module.exports = new UserController();
