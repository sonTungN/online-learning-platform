// src/app/controllers/AdminController.js
const User = require("../models/User");
const { hashPassword } = require("../../utils/helper");
const path = require("path");
class AdminController {
  // [GET] /admin
  async index(req, res, next) {
    try {
      const users = await User.find({accountType: { $ne: "ADMIN" } }).lean(); // Fetch all users from the database
      res.render("admin/index", {
        title: "Admin Dashboard",
        styles: ["bootstrap_v5.css"], 
        users
      });
    } catch (e) {
      next(e);
      console.log(e)
    }
  }

  // [GET] /admin/user/add
  addUser(req, res, next) {
    try {
      res.render("admin/user/add", {
        title: "Add New User",
        styles: ["bootstrap_v5.css"], // Add specific styles for the add user page
      });
    } catch (e) {
      next(e);
    }
  }
  // [GET] /admin/user/add
  async addUser(req, res, next) {
    try {
      // Render the add user page with default or empty values
      res.render("admin/user/add", {
        title: "Add New User",
        styles: ["bootstrap_v5.css"], // Add specific styles for the add user page
        firstName: "", // Empty value for new user
        lastName: "", // Empty value for new user
        phone: "", // Empty value for new user
        email: "", // Empty value for new user
        address: "", // Empty value for new user
        city: "", // Empty value for new user
        zipCode: "", // Empty value for new user
        country: "", // Empty value for new user
        accountType: "", // Empty value for new user
      });
    } catch (e) {
      next(e);
    }
  }

  // [GET] /admin/user/edit/:id
  async editUser(req, res, next) {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId); // Fetch the user data from the database
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.render("admin/user/edit", {
        title: "Edit User",
        styles: ["bootstrap_v5.css"],
        _id:user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        address: user.address,
        city: user.city,
        zipCode: user.zipCode,
        schoolName: user.schoolName,
        jobTitle: user.jobTitle,
        isLearner: user.accountType === "LEARNER",
        isInstructor: user.accountType === "INSTRUCTOR",
      });
    } catch (e) {
      next(e);
    }
  }

  async viewUser(req, res, next) {
    const userId = req.params.id; // Get user ID from the request parameters
    try {
      const user = await User.findById(userId).lean(); // Fetch user data from the database
      if (!user) {
        return res.status(404).send("User not found");
      }   
      res.render("admin/user/view", {
        title: `User ${user.firstName} ${user.lastName}`,
        styles: ["bootstrap_v5.css"],
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        address: user.address,
        city: user.city,
        zipCode: user.zipcode,
        country: user.country,
        accountType: user.accountType,
        _id: user._id, // Make sure you include the user ID
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      next(error);
    }
  }
  // Add new user (POST request)
  async addUserPost(req, res, next) {
    try {
      let profileImgPath;
      if (req.file) {
        profileImgPath = path.join("/assets/uploads/", req.file.filename);
      } else {
        profileImgPath = "/assets/uploads/default.png";
      }
      const user = new User({
        ...req.body,
        createdAt: new Date(),
        password: hashPassword(req.body.password),
        profileImg: profileImgPath,
      });
      await user.save(); // Save the new user to the database
      res.redirect("/admin"); // Redirect to the user list page after adding
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).send("Error adding user."); // Provide a user-friendly error message
    }
  }

  // Edit existing user (POST request)
  async editUserPost(req, res, next) {
    const userId = req.params.id;
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      
      // Check if the user exists and is an admin
      if (!user) {
        return res.status(404).send('User not found');
      }
      
      if (user.accountType === 'ADMIN') {
        return res.status(403).send('Cannot edit admin account');
      }
  
      // Update the user in the database
      await User.findByIdAndUpdate(userId, req.body);
  
      // Redirect to the user view page
      res.redirect("/admin/user/view/" + userId);
    } catch (error) {
      next(error);
    }
  }
  

  // Delete user
  async deleteUser(req, res, next) {
    const userId = req.params.id;
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      
      // Check if the user exists and is an admin
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      if (user.accountType === 'ADMIN') {
        return res.status(403).send('Cannot delete admin account');
      }
  
      // Remove the user from the database
      await User.findByIdAndDelete(userId);
  
      // Redirect to the user list page
      res.redirect("/admin");
    } catch (error) {
      next(error);
    }
  }
  

}

module.exports = new AdminController();
