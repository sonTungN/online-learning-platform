class HomeController {
  // [GET] /
  show(req, res, next) {
    res.render("home", {
      title: "Homepage",
      styles: ["home.css", "bootstrap_v5.css"],
      isHome: true,
      user: req.session.user,
    });
  }

  // [GET] /about-us
  aboutUs(req, res, next) {
    res.render("support/about-us", {
      title: "About Us",
      styles: ["about-us.css"],
      scripts: ["about-us.js"],
      user: req.session.user,
    });
  }

  // [GET] /pricing-plan
  pricing(req, res, next) {
    res.render("support/pricing-plan", {
      title: "Pricing",
      styles: ["pricing-plan.css"],
      user: req.session.user,
    });
  }

  // [GET] /faq
  faq(req, res, next) {
    res.render("support/faq", {
      title: "FAQ",
      styles: ["faq.css"],
      scripts: ["faq.js"],
      user: req.session.user,
    });
  }
}

module.exports = new HomeController();
