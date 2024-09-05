const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");
const { checkExistedEmail, isValidAuth } = require("../middlewares/isExisted");
const { authenticate } = require("../middlewares/authentication");
const upload = require("../config/multer");

router.get("/sign-up", userController.create);
router.post(
  "/:email/store",
  upload.single("profileImg"),
  checkExistedEmail,
  userController.store,
);

router.get("/sign-in", userController.entry);
router.get("/sign-in/guest", userController.guest);
router.post("/:email/auth", authenticate, userController.auth);

router.get("/logout", userController.quit);

module.exports = router;
