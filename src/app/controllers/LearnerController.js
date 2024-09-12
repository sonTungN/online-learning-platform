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
}

module.exports = new LearnerController();
