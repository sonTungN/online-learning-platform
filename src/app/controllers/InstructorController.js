class InstructorController {
  // [GET] /instructor/profile
  profile(req, res, next) {
    try {
      res.render("instructor/profile", {
        title: "Instructor Profile",
        styles: ["instructor/profile.css", "bootstrap_v5.css"],
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
      });
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
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new InstructorController();
