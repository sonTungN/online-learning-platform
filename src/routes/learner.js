const express = require("express");
const router = express.Router();
const {
  preventUnauthenticated,
} = require("../middlewares/check-authenticated");
const learnerController = require("../app/controllers/LearnerController");

router.get("/order-placement", preventUnauthenticated, learnerController.order);

router.get("/edit-profile", preventUnauthenticated, learnerController.edit);
router.post(
  "/edit-profile",
  preventUnauthenticated,
  learnerController.editProfile,
);

router.get(
  "/my-courses/purchased",
  preventUnauthenticated,
  learnerController.viewPurchased,
);

router.get(
  "/my-courses/trial",
  preventUnauthenticated,
  learnerController.viewTrial,
);

router.get(
  "/my-courses/wishlist",
  preventUnauthenticated,
  learnerController.viewWishlist,
);

router.get("/browse-courses", learnerController.display);

router.get("/profile", preventUnauthenticated, learnerController.showProfile);
module.exports = router;
