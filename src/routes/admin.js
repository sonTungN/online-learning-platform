// src/routes/admin.js
const express = require('express');
const router = express.Router();
const AdminController = require('../app/controllers/AdminController');

// Admin routes
router.get('/', AdminController.index);
router.get('/user/add', AdminController.addUser);
router.get('/user/edit', AdminController.editUser);
router.get('/user/view', AdminController.viewUser);

// Admin routes for courses
router.get('/course', AdminController.listCourses); 
router.get('/course/add', AdminController.addCourse);  
router.get('/course/edit', AdminController.editCourse);  
router.get('/course/view', AdminController.viewCourse); 

module.exports = router;