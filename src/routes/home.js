const express = require("express");
const router = express.Router();

const homeController = require("../app/controllers/homeController");

// [GET] /sign-in
router.get("/", homeController.show);

module.exports = router;
