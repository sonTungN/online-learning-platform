const User = require("../models/User");
const Cart = require("../models/Cart");
const Course = require("../models/Course");
const mongoose = require("mongoose");

class LearnerController {
  // [GET] /instructor/profile
  async order(req, res, next) {
    const userId = req.session.user.id;
    const cart = await Cart.findOne({ user: userId })
      .populate("courses")
      .lean();
    const totalPrice = cart.courses.reduce(
      (acc, course) => acc + course.price,
      0,
    );
    cart.courses = cart.courses.map((course) => {
      return {
        ...course,
        addedToWishlist: course.favUsers.some(
          (user) => user._id.toString() === userId,
        ),
      };
    });
    try {
      res.render("learner/order-placement", {
        title: "Order Placement",
        styles: ["learner/order-placement.css", "bootstrap_v5.css"],
        user: req.session.user,
        cart,
        totalPrice,
      });
    } catch (e) {
      next(e);
    }
  }

  async viewPurchased(req, res, next) {
    const userId = req.session.user.id;
    const purchasedCourses = await Course.find({
      enrolledUsers: { $in: [userId] },
    }).lean();
    try {
      res.render("learner/view-courses", {
        title: "My learning",
        styles: ["learner/view-courses.css", "bootstrap_v5.css"],
        user: req.session.user,
        purchasedCourses,
      });
    } catch (e) {
      next(e);
    }
  }

  async viewTrial(req, res, next) {
    try {
      const userId = req.session.user.id;
      const courses = await Course.find({ inTrialUsers: userId }).lean();
      res.render("learner/on-trial", {
        title: "My learning",
        styles: ["learner/on-trial.css", "bootstrap_v5.css"],
        user: req.session.user,
        courses,
      });
    } catch (e) {
      next(e);
    }
  }

  async viewWishlist(req, res, next) {
    try {
      const userId = req.session.user.id;
      // Fetch the user by their session ID
      const user = await User.findById(userId);

      // If the user is not found in the database, redirect to sign-in
      if (!user) {
        return res.redirect("/user/sign-in");
      }

      const cart = await Cart.findOne({ user: userId })
        .populate("courses")
        .lean();
      const userCart = cart
        ? cart.courses.map((course) => course._id.toString())
        : [];
      // Fetch favorite courses where the user's ID is in the favUsers array using $in
      let favoriteCourses = await Course.find({
        favUsers: { $in: [userId] },
      })
        .lean()
        .exec();

      favoriteCourses = favoriteCourses.map((course) => {
        const data = {
          ...course,
          addedToCart: userCart.includes(course._id.toString()),
        };

        return data;
      });
      // Render the wishlist page with the favorite courses
      res.render("learner/wishlist", {
        title: "My learning",
        styles: ["learner/wishlist.css", "bootstrap_v5.css"],
        user: req.session.user, // Pass user data from session
        courses: favoriteCourses, // Pass favorite courses to the view
      });
    } catch (e) {
      next(e); // Handle any errors by passing them to the next middleware
    }
  }

  async showProfile(req, res, next) {
    try {
      const user = await User.findById(req.session.user.id).lean();
      if (!user) {
        return res.redirect("/user/sign-in");
      }
      res.render("learner/profile", {
        title: "Profile",
        user: req.session.user,
        styles: ["learner/profile.css", "bootstrap_v5.css"],
        currentUser: user,
      });
    } catch (error) {
      next(error);
    }
  }

  // [GET] /learner/edit-profile
  async edit(req, res, next) {
    try {
      // Find the user in the database
      const user = await User.findById(req.session.user.id).lean();

      if (!user) {
        // Handle if user is not found
        return res.status(404).send("User not found");
      }
      req.session.user = {
        ...req.session.user, // Preserve existing fields
        email: user.email, // Update specified fields
        displayName: `${user.firstName} ${user.lastName}`,
        displayImg: user.profileImg,
        accountType: user.accountType,
      };
      res.render("learner/edit-profile", {
        title: "Edit Profile",
        styles: ["learner/edit-profile.css"],
        user: req.session.user,
        userJson: JSON.stringify(user),
        currentUser: user,
      });
    } catch (e) {
      next(e);
    }
  }

  async editProfile(req, res, next) {
    try {
      // Log specific parts of req object
      const body = req.body;
      const file = req.file;
      const id = req.session.user.id;
      // Find and update user based on email
      const updatedUser = await User.findOneAndUpdate(
        { _id: id }, // Query to find the user
        body, // Data to update
        { new: true, runValidators: true }, // Options to return the updated document and run validators
      );

      if (!updatedUser) {
        return res.status(404).send("User not found");
      }

      // Send a response to the client
      res.redirect("/learner/edit-profile");
    } catch (e) {
      next(e);
    }
  }

  async display(req, res, next) {
    try {
      const user = req.session.user || null;
      const order = req.query.order || "asc";
      const category = req.query.category
        ? decodeURIComponent(req.query.category)
        : "all";

      let query = {};
      if (category !== "all") {
        query.category = { $regex: new RegExp(category, "i") }; // Case-insensitive match
      }

      let courses = await Course.find(query).lean();
      courses = courses.sort((a, b) => {
        if (order === "asc") {
          return a.title.localeCompare(b.title);
        } else if (order === "desc") {
          return b.title.localeCompare(a.title);
        }
      });
      if (user) {
        const cart = await Cart.findOne({ user: user.id });
        courses = courses.map((course) => {
          const data = {
            ...course,
            addedToCart: cart.courses
              .map((courseId) => courseId.toString())
              .includes(course._id.toString()),
          };
          return data;
        });
      }
      console.log(courses);
      res.render("learner/browse", {
        title: "Browse Courses",
        styles: ["learner/browse.css", "bootstrap_v5.css"],
        user,
        courses,
        category,
        order,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new LearnerController();
