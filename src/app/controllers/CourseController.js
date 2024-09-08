class CourseController {
  // [GET] /course/edit-course
  edit(req, res, next) {
    try {
      res.render("course/edit-course", {
        title: "Edit Course",
        styles: ["course/edit-course.css"],
      });
    } catch (e) {
      next(e);
    }
  }

  view(req, res, next) {
    try {
      res.render("course/course-profile", {
        title: "Course Details",
        styles: ["course/course-profile.css", "bootstrap_v5.css"],
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CourseController();
