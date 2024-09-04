class HomeController {
  // [GET] /
  show(req, res, next) {
    res.render("home", {
      title: "Homepage",
      styles: ["home.css", "bootstrap_v5.css"],
      isHome: true,
    });
  }

  // [GET] /about-us
  aboutUs(req, res, next) {
    res.render("support/about-us", {
      title: "About Us",
      styles: ["about-us.css"],
      scripts: ["about-us.js"],
    });
  }

  // [GET] /pricing-plan
  pricing(req, res, next) {
    res.render("support/pricing-plan", {
      title: "Pricing",
      styles: ["pricing-plan.css"],
    });
  }

  // [GET] /faq
  faq(req, res, next) {
    res.render("support/faq", {
      title: "FAQ",
      styles: ["faq.css"],
      scripts: ["faq.js"],
    });
  }
}

module.exports = new HomeController();
