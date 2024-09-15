// src/routes/admin.js
const express = require("express");
const router = express.Router();
const AdminController = require("../app/controllers/AdminController");
// const { adminAuthorize } = require("../middlewares/admin-authorize");

// Admin routes for users
router.get("/user/add", AdminController.addUser);
router.post("/user/add", AdminController.addUserPost); // Add new user (POST)
router.get("/user/edit/:id", AdminController.editUser);
router.post("/user/edit/:id", AdminController.editUserPost); // Edit user (POST)
router.get("/user/view/:id", AdminController.viewUser);
router.post("/user/delete/:id", AdminController.deleteUser); // Delete user (POST)
router.get("/", AdminController.index);

module.exports = router;
