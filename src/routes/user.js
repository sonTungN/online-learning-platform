const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");
const { checkExistedEmail, isValidAuth } = require("../middlewares/validate");
const { authenticate } = require("../middlewares/authentication");

router.get("/sign-up", userController.create);
router.post("/:email/store", checkExistedEmail, userController.store);

router.get("/sign-in", userController.entry);
router.post("/:email/auth", authenticate, userController.auth);

// router.post("/sign-in", userController.auth);

module.exports = router;
