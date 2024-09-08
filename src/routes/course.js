const express = require("express");
const router = express.Router();

const courseController = require("../app/controllers/CourseController");

router.get("/edit-course", courseController.edit);

module.exports = router;
