const Course = require("../models/Course");
const mongoose = require("mongoose");

class CourseController {
  // [GET] /course/edit-course
  async edit(req, res, next) {
    try {
      const id = req.params.id;
      // Check if the ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.redirect("/");
      }
      const matchedCourse = await Course.findOne({ _id: id }).lean();
      if (!matchedCourse) {
        res.redirect("/");
      }

      res.render("course/edit-course", {
        title: "Edit Course",
        styles: ["course/edit-course.css"],
        user: req.session.user,
        course: matchedCourse,
        courseJSON: JSON.stringify(matchedCourse),
      });
    } catch (e) {
      next(e);
    }
  }
  async updateCourse(req, res, next) {
    try {
      console.log(req.file)
      res.redirect(`/course/edit-course/${req.params.id}`)
    } catch (error) {
      next(error);
      console.log(error);
    };
  }
  async view(req, res, next) {
    try {
      const id = req.params.id;
      // const matchedCourse = await Course.findOne({ _id: id });
      // if (!matchedCourse) {
      //   res.redirect("/");
      // }
      res.render("course/course-profile", {
        title: "Course Details",
        styles: ["course/course-profile.css", "bootstrap_v5.css"],
        user: req.session.user,
        // course: matchedCourse,
      });
    } catch (e) {
      next(e);
    }
  }
  // [DELETE] /course/:id
  async delete(req, res, next) {
    try {
      const courseId = req.params.id;
      await Course.findByIdAndDelete(courseId); // Delete the course by ID
      res.redirect("/instructor/courses"); // Redirect to courses list after deletion
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CourseController();
