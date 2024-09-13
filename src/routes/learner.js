const express = require("express");
const router = express.Router();
const {
    preventUnauthenticated,
  } = require("../middlewares/check-authenticated");
const learnerController = require("../app/controllers/LearnerController");

router.get("/order-placement", learnerController.order);

router.get("/my-courses/purchased", learnerController.viewPurchased);

router.get("/my-courses/trial", learnerController.viewTrial);

router.get("/my-courses/wishlist", learnerController.viewWishlist);
router.get('/profile',preventUnauthenticated, learnerController.showProfile);
module.exports = router;
