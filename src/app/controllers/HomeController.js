const User = require("../models/User");
const Course = require("../models/Course");
const Cart = require("../models/Cart");
const path = require("path");
class HomeController {
  // [GET] /
  async show(req, res, next) {
    try {
      let [recentCourses, featuredCourses, newlyInstructors, topInstructors] =
        await Promise.all([
          Course.find()
            .populate("user")
            .populate("favUsers")
            .sort({ createdAt: -1 })
            .limit(6)
            .lean(),

          Course.aggregate([
            { $addFields: { enrolledUsersCount: { $size: "$enrolledUsers" } } },
            { $sort: { enrolledUsersCount: -1 } },
            { $limit: 3 },
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
              },
            },
            { $unwind: "$user" }, // Ensures user is an object, not an array
            {
              $lookup: {
                from: "users",
                localField: "favUsers",
                foreignField: "_id",
                as: "favUsers",
              },
            },
          ]).exec(),

          User.find({ accountType: "INSTRUCTOR" })
            .sort({ createdAt: -1 })
            .limit(6)
            .lean(),

          Course.aggregate([
            {
              $group: {
                _id: "$user", // Group by instructor
                totalStudents: { $sum: { $size: "$enrolledUsers" } }, // Sum of enrolled users
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "instructor",
              },
            },
            { $unwind: "$instructor" },
            { $sort: { totalStudents: -1 } }, // Sort by total students
            { $limit: 5 }, // Limit the result to top 5 instructors
          ]).exec(),
        ]);

      const userId = req.session.user ? req.session.user.id : null; // Check if user is logged in
      const user = req.session.user ? req.session.user : null;

      // Fetch the user's cart if logged in
      let userCart = [];
      if (userId) {
        const cart = await Cart.findOne({ user: userId })
          .populate("courses")
          .lean();
        userCart = cart
          ? cart.courses.map((course) => course._id.toString())
          : [];
      }
      recentCourses = recentCourses.map((course) => {
        const date = new Date(course.createdAt);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        let courseData = {
          ...course,
          createdAt: `${day}/${month}/${year}`,
          addedToCart: userId
            ? userCart.includes(course._id.toString())
            : false,
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
          addedToCart: userId
            ? userCart.includes(course._id.toString())
            : false,
        };
        if (userId) {
          // Check if the userId exists in the favUsers array
          courseData.addedToWishlist = course.favUsers.some(
            (user) => user._id.toString() === userId
          );
        }
        return courseData;
      });
      topInstructors = topInstructors.map((data) => {
        const date = new Date(data.instructor.createdAt);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        let formattedData = {
          ...data,
          instructor: {
            ...data.instructor,
            createdAt: `${day}/${month}/${year}`,
          },
        };

        return formattedData;
      });

      res.render("home", {
        title: "Homepage",
        styles: ["home.css", "bootstrap_v5.css"],
        isHome: true,
        user: req.session.user,
        userJson: JSON.stringify(user),
        currentUser: user,
        isLearner: user && user.accountType === "LEARNER",
        recentCourses,
        featuredCourses,
        newlyInstructors,
        topInstructors,
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

  copyright(req, res, next) {
    res.render("terms/copyright", {
      title: "Copyright",
      styles: ["terms.css"],
      user: req.session.user,
    });
  }

  services(req, res, next) {
    res.render("terms/services", {
      title: "Terms of Services",
      styles: ["terms.css"],
      user: req.session.user,
    });
  }

  policy(req, res, next) {
    res.render("terms/policy", {
      title: "Privacy Policy",
      styles: ["terms.css"],
      user: req.session.user,
    });
  }

  thankyou(req, res, next) {
    res.render("support/thank-you", {
      title: "Thank You",
      styles: ["thank-you.css", "bootstrap_v5.css"],
      user: req.session.user,
    });
  }
}

module.exports = new HomeController();
