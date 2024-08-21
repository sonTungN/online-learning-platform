const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");

// [GET] /sign-in
router.get("/sign-in", userController.entry);

// [GET] /sign-up
router.get("/sign-up", userController.create);

module.exports = router;
