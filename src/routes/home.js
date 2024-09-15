const express = require("express");
const router = express.Router();
const homeController = require("../app/controllers/HomeController");
const {
  preventUnauthenticated,
} = require("../middlewares/check-authenticated");
// About us page, Pricing page, FAQ page, Contact us page, etc.
router.get("/about-us", homeController.aboutUs);
router.get("/pricing", homeController.pricing);
router.get("/faq", homeController.faq);
router.get("/copyright", homeController.copyright);
router.get("/services", homeController.services);
router.get("/policy", homeController.policy);

router.get("/", homeController.show);
router.get("/thank-you", preventUnauthenticated, homeController.thankyou);
module.exports = router;
