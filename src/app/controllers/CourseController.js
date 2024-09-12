const Course = require("../models/Course");

class CourseController {
  // [GET] /course/edit-course
  async edit(req, res, next) {
    try {
      const id = req.params.id;
      // const matchedCourse = await Course.findOne({ _id: id });
      // if (!matchedCourse) {
      //   res.redirect("/");
      // }
      res.render("course/edit-course", {
        title: "Edit Course",
        styles: ["course/edit-course.css"],
        user: req.session.user,
        // course: matchedCourse,
      });
    } catch (e) {
      next(e);
    }
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
}

module.exports = new CourseController();
