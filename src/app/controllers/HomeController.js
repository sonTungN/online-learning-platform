const User = require("../models/User");
const Course = require("../models/Course");
const path = require("path");
class HomeController {
  // [GET] /
  async show(req, res, next) {
    try {
      let [recentCourses,featuredCourses ] = await Promise.all([
        Course.find()
          .populate("user")
          .populate("favUsers")
          .sort({ createdAt: -1 })
          .limit(6)
          .lean(),
        
          Course.aggregate([
            { $addFields: { enrolledUsersCount: { $size: "$enrolledUsers" } } },
            { $sort: { enrolledUsersCount: -1 } },
            { $limit: 5 },
            { $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
              }
            },
            { $unwind: '$user' }, // Ensures user is an object, not an array
            { $lookup: {
                from: 'users',
                localField: 'favUsers',
                foreignField: '_id',
                as: 'favUsers'
              }
            }
          ])
          .exec()
      ]);

      const userId = req.session.user ? req.session.user.id : null; // Check if user is logged in
      console.log(recentCourses)
      recentCourses = recentCourses.map((course) => {
        const date = new Date(course.createdAt);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        let courseData = {
          ...course,
          createdAt: `${day}/${month}/${year}`,
        };
        if (userId) {
          // Check if the userId exists in the favUsers array
          courseData.addedToWishlist = course.favUsers.some(
            (user) => user._id.toString() === userId
          );
        }
        return courseData;
      });

      featuredCourses = featuredCourses.map((course) => {
        const date = new Date(course.createdAt);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        let courseData = {
          ...course,
          createdAt: `${day}/${month}/${year}`,
        };
        if (userId) {
          // Check if the userId exists in the favUsers array
          courseData.addedToWishlist = course.favUsers.some(
            (user) => user._id.toString() === userId
          );
        }
        return courseData;
      });
      console.log(featuredCourses)
      res.render("home", {
        title: "Homepage",
        styles: ["home.css", "bootstrap_v5.css"],
        isHome: true,
        user: req.session.user,
        recentCourses,
        featuredCourses
      });
    } catch (error) {
      next(error);
      console.log(error);
    }
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
