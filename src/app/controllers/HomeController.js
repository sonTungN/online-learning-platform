class HomeController {
  show(req, res, next) {
    res.render("home", {
      title: "Homepage",
      styles: ["home.css", "bootstrap_v5.css"],
      isHome: true,
    });
  }

  aboutUs(req, res, next) {
    res.render("support/about-us", {
      title: "About Us",
      styles: ["about-us.css"],
    });
  }

  pricing(req, res, next) {
    res.render("support/pricing-plan", {
      title: "Pricing",
      styles: ["pricing-plan.css"],
    });
  }

  faq(req, res, next) {
    res.render("support/faq", {
      title: "FAQ",
      styles: ["faq.css"],
    });
  }
}

module.exports = new HomeController();
