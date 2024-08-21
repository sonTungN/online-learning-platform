class UserController {
  entry(req, res, next) {
    res.render("sign-in", {
      title: "Sign In",
      styles: ["sign-in.css"],
    });
  }

  create(req, res, next) {
    res.render("sign-up", {
      title: "Sign Up",
      styles: ["sign-up.css"],
    });
  }
}

module.exports = new UserController();
