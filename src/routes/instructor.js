const express = require("express");
const router = express.Router();

const instructorController = require("../app/controllers/InstructorController");

router.get("/profile", instructorController.profile);

router.get("/courses", instructorController.view);

router.get("/add-courses", instructorController.add);

router.get("/edit-profile", instructorController.edit);

module.exports = router;
