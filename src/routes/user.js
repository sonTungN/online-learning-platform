const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");
const { checkExistedEmail, isValidAuth } = require("../middlewares/isExisted");
const { authenticate } = require("../middlewares/authentication");
const { preventAuthenticated } = require("../middlewares/check-authenticated");
const upload = require("../config/multer");

router.get("/sign-up", preventAuthenticated, userController.create);
router.post(
  "/:email/store",
  upload.single("profileImg"),
  checkExistedEmail,
  userController.store
);

router.get("/sign-in", preventAuthenticated, userController.entry);
router.get("/sign-in/guest", userController.guest);
router.post("/:email/auth", authenticate, userController.auth);

router.get("/logout", userController.quit);

module.exports = router;
