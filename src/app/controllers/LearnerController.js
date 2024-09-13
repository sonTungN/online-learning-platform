const User = require("../models/User");

class LearnerController {
  // [GET] /instructor/profile
  order(req, res, next) {
    try {
      res.render("learner/order-placement", {
        title: "Order Placement",
        styles: ["learner/order-placement.css", "bootstrap_v5.css"],
        user: req.session.user,
      });
    } catch (e) {
      next(e);
    }
  }

  viewPurchased(req, res, next) {
    try {
      res.render("learner/view-courses", {
        title: "My learning",
        styles: ["learner/view-courses.css", "bootstrap_v5.css"],
        user: req.session.user,
      });
    } catch (e) {
      next(e);
    }
  }

  viewTrial(req, res, next) {
    try {
      res.render("learner/on-trial", {
        title: "My learning",
        styles: ["learner/on-trial.css", "bootstrap_v5.css"],
        user: req.session.user,
      });
    } catch (e) {
      next(e);
    }
  }

  viewWishlist(req, res, next) {
    try {
      res.render("learner/wishlist", {
        title: "My learning",
        styles: ["learner/wishlist.css", "bootstrap_v5.css"],
        user: req.session.user,
      });
    } catch (e) {
      next(e);
    }
  }

  async showProfile(req, res, next) {
    try {
      const user = await User.findById(req.session.user.id).lean();
      if (!user) {
        return res.redirect("/user/sign-in");
      }
      res.render("learner/profile", {
        title: "Profile",
        user: req.session.user,
        styles: ["learner/profile.css", "bootstrap_v5.css"],
        currentUser: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LearnerController();
