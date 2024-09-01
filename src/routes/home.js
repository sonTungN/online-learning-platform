const express = require("express");
const router = express.Router();

const homeController = require("../app/controllers/homeController");

// [GET] /sign-in
router.get("/", homeController.show);

// About us page, Pricing page, FAQ page, Contact us page, etc.
router.get("/about-us", HomeRender.aboutUs);
router.get("/pricing", HomeRender.pricing);
router.get("/faq", HomeRender.faq);

module.exports = router;
