class InstructorController {
  // [GET] /profile
  profile(req, res, next) {
    try {
      res.render("instructor/profile", {
        title: "Instructor Profile",
        styles: ["instructor-profile.css", "bootstrap_v5.css"],
      });
    } catch (e) {
      next(e);
    }
  }

  edit(req, res, next) {
    try {
      res.render("instructor/edit", {
        title: "Edit Profile",
        styles: ["instructor-edit-profile.css"],
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new InstructorController();
