class InstructorController {
  // [GET] /profile
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

  add(req, res, next) {
    try {
      res.render("instructor/add-courses", {
        title: "Add Course",
        styles: ["instructor/add-courses.css"],
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new InstructorController();
