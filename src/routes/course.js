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

router.get("/:id", courseController.view);
router.delete("/:id", preventUnauthenticated, courseController.delete);

router.post("/fav/:id", preventUnauthenticated, courseController.addToFav);
router.post("/cart/:id", preventUnauthenticated, courseController.addToCart);
router.post('/payment',preventUnauthenticated,courseController.payment)
router.post('/trial/:id', preventUnauthenticated, courseController.trial)
module.exports = router;
