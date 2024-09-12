const User = require("../models/User");
const Course = require("../models/Course");

class InstructorController {
  // [GET] /instructor/profile
  profile(req, res, next) {
    try {
      res.render("instructor/profile", {
        title: "Instructor Profile",
        styles: ["instructor/profile.css", "bootstrap_v5.css"],
        user: req.session.user,
      });
    } catch (e) {
      next(e);
    }
  }

  // [GET] /instructor/edit-profile
  edit(req, res, next) {
    try {
      res.render("instructor/edit-profile", {
        title: "Edit Profile",
        styles: ["instructor/edit-profile.css"],
        user: req.session.user,
      });
    } catch (e) {
      next(e);
    }
  }

  // [POST] /instructor/edit-profile
  async editProfile(req, res, next) {
    try {
      // Log specific parts of req object
      const body = req.body;
      const currentUser = req.session.user;
      const email = currentUser.email;
      const id = currentUser.id;
      // Find and update user based on email
      const updatedUser = await User.findOneAndUpdate(
        { email }, // Query to find the user
        body, // Data to update
        { new: true, runValidators: true } // Options to return the updated document and run validators
      );

      if (!updatedUser) {
        return res.status(404).send("User not found");
      }

      // Send a response to the client
      res.send("Profile updated successfully");
    } catch (e) {
      next(e);
    }
  }

  // [GET] /instructor/courses
  view(req, res, next) {
    try {
      res.render("instructor/courses", {
        title: "My Courses",
        styles: ["instructor/courses.css", "bootstrap_v5.css"],
        user: req.session.user,
      });
    } catch (e) {
      next(e);
    }
  }

  // [GET] /instructor/add-course
  add(req, res, next) {
    try {
      res.render("instructor/add-course", {
        title: "Add Course",
        styles: ["instructor/add-course.css"],
        user: req.session.user,
      });
    } catch (e) {
      next(e);
    }
  }
  // [POST] /instructor/add-course
  async addCourse(req, res, next) {
    try {
      const body = req.body;
      const formattedBody = {
        ...body,
        level: "Beginner",
        courseImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyivT7Qb3bJEd7s0Do_O0BHN2bFR35k7hdLA&s",
        price: 10.99,
        description: "Desc",
      };
      const course = new Course(formattedBody);
      await course.save().then(() => res.redirect("/instructor/profile"));
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

module.exports = new InstructorController();
