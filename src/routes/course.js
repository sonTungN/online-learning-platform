const express = require("express");
const router = express.Router();

const {
  preventUnauthenticated,
} = require("../middlewares/check-authenticated");
const { checkFile } = require("../middlewares/check-file");
const courseController = require("../app/controllers/CourseController");

router.get("/edit-course/:id", preventUnauthenticated, courseController.edit);
router.patch(
  "/:id",
  preventUnauthenticated,
  checkFile,
  courseController.updateCourse
);

router.get("/:id", preventUnauthenticated, courseController.view);
router.delete("/:id", preventUnauthenticated, courseController.delete);
module.exports = router;
