const express = require("express");
const router = express.Router();

const instructorController = require("../app/controllers/InstructorController");
const { validateEditProfile } = require("../middlewares/validateEditProfile");
const {
  preventUnauthenticated,
} = require("../middlewares/check-authenticated");
const { route } = require("./user");
router.get("/profile", preventUnauthenticated, instructorController.profile);

router.get("/courses", preventUnauthenticated, instructorController.view);

router.get("/add-course", preventUnauthenticated, instructorController.add);

router.get("/edit-profile", preventUnauthenticated, instructorController.edit);

router.post(
  "/edit-profile",
  preventUnauthenticated,
  instructorController.editProfile
);

router.post(
  "/add-course",
  preventUnauthenticated,
  instructorController.addCourse
);
module.exports = router;
