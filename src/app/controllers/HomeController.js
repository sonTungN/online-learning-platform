class HomeController {
  show(req, res, next) {
    res.render("home", {
      title: "Home",
      styles: ["home.css"],
    });
  }
}

module.exports = new HomeController();
