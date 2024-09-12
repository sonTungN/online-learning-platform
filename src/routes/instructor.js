const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const instructorController = require("../app/controllers/InstructorController");
const {
  preventUnauthenticated,
} = require("../middlewares/check-authenticated");
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
  upload.single("courseImg"),
  instructorController.addCourse
);
module.exports = router;
