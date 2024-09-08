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
}

module.exports = new CourseController();
