const express = require("express");
const router = express.Router();

const courseController = require("../app/controllers/CourseController");

router.get("/edit-course", courseController.edit);

router.get("/profile", courseController.view);

module.exports = router;
