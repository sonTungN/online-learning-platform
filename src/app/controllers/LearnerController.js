class LearnerController {
  // [GET] /instructor/profile
  order(req, res, next) {
    try {
      res.render("learner/order-placement", {
        title: "Order Placement",
        styles: ["learner/order-placement.css", "bootstrap_v5.css"],
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new LearnerController();
