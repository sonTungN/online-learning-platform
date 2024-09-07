const express = require("express");
const router = express.Router();

const instructorController = require("../app/controllers/InstructorController");

router.get("/profile", instructorController.profile);

router.get("/view-courses", instructorController.view);

router.get("/add-courses", instructorController.add);

router.get("/edit", instructorController.edit);

module.exports = router;
