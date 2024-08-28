const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");
const { checkExistedEmail } = require("../middlewares/isExisted");

router.get("/sign-in", userController.entry);
router.post("/:email/store", checkExistedEmail, userController.store);

// router.post("/sign-in", userController.auth);

router.get("/sign-up", userController.create);

module.exports = router;
