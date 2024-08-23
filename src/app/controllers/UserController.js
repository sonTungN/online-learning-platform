const User = require("../models/User");
const { mongooseToObject } = require("../../utils/mongoose");
//import bcrypt to hash password
const bcrypt = require('bcrypt');

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
      if (matchedUser) {
        // Compare the hashed password
        const isPasswordValid = await bcrypt.compare(req.body.password, matchedUser.password);
        if (isPasswordValid) {
          res.render("home");
        } else {
          res.send("Wrong Password");
        }
      } else {
        res.send("User not found");
      }
    } catch (error) {
      res.send("An error occurred");
    }
  }

  async store(req, res, next) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const data = {
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hashedPassword,  // Save the hashed password
      profileImg: req.body.profileImg,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      zipCode: req.body.zipCode,
      country: req.body.country,
      accountType: req.body.accountType,
    };
    // Conditionally add instructor-specific fields
    if (req.body.accountType === "instructor") {
      data.schoolName = req.body.schoolName;
      data.jobTitle = req.body.jobTitle;
      data.specialization = req.body.specialization;
    }
    await User.create(data);
    res.redirect("/user/sign-in");
  }
}

module.exports = new UserController();
