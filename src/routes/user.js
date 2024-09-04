const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");
const { checkExistedEmail, isValidAuth } = require("../middlewares/isExisted");
const { authenticate } = require("../middlewares/authentication");

router.get("/sign-up", userController.create);
router.post("/:email/store", checkExistedEmail, userController.store);

router.get("/sign-in", userController.entry);
router.get("/sign-in/guest", userController.guest);
router.post("/:email/auth", authenticate, userController.auth);

module.exports = router;
