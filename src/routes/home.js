const express = require("express");
const router = express.Router();

const homeController = require("../app/controllers/homeController");

// [GET] /sign-in
router.get("/", homeController.show);

// About us page, Pricing page, FAQ page, Contact us page, etc.
router.get("/about-us", homeController.aboutUs);
router.get("/pricing", homeController.pricing);
router.get("/faq", homeController.faq);

module.exports = router;
