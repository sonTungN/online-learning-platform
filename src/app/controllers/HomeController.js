const User = require("../models/User");
const Course = require("../models/Course");
const path = require("path");
class HomeController {
  // [GET] /
  async show(req, res, next) {
    let [recentCourses] = await Promise.all([
      Course.find().sort({ createdAt: -1 }).limit(6).lean(),
    ]);
    recentCourses = recentCourses.map((course) => {
      const date = new Date(course.createdAt);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const year = date.getFullYear();
      return {
        ...course,
        createdAt: `${day}/${month}/${year}`,
      };
    });
    res.render("home", {
      title: "Homepage",
      styles: ["home.css", "bootstrap_v5.css"],
      isHome: true,
      user: req.session.user,
      recentCourses,
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
