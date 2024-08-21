const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");

// [GET] /sign-in
router.get("/sign-in", userController.entry);

// [POST] /sign-in
router.post("/sign-in", userController.auth);

// [GET] /sign-up
router.get("/sign-up", userController.create);

// [POST] /sign-up
router.post("/sign-up", userController.store);

module.exports = router;
