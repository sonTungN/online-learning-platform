const Course = require("../models/Course");
const Cart = require("../models/Cart");
const User = require("../models/User");
const mongoose = require("mongoose");
const path = require("path");
class CourseController {
  // [GET] /course/edit-course
  async edit(req, res, next) {
    try {
      const id = req.params.id;
      // Check if the ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.redirect("/");
      }
      const matchedCourse = await Course.findOne({ _id: id }).lean();
      if (!matchedCourse) {
        res.redirect("/");
      }

      res.render("course/edit-course", {
        title: "Edit Course",
        styles: ["course/edit-course.css"],
        user: req.session.user,
        course: matchedCourse,
        courseJSON: JSON.stringify(matchedCourse),
      });
    } catch (e) {
      next(e);
    }
  }

  async updateCourse(req, res, next) {
    try {
      const body = req.body;
      let profileImgPath;

      // Check if an image was uploaded; if not, use the current image
      if (req.file) {
        profileImgPath = path.join("/assets/uploads/", req.file.filename);
      } else {
        profileImgPath = body.currentCourseImg;
      }

      const updatedCourseData = {
        title: body.title,
        description: body.description,
        category: body.category,
        level: body.level,
        courseImg: profileImgPath,
        price: body.price,
      };

      // Find the course and update it
      await Course.findByIdAndUpdate(req.params.id, updatedCourseData);

      res.redirect(`/instructor/courses`);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async view(req, res, next) {
    try {
      const user = req.session.user ? req.session.user : null;
      if (!user) {
        res.redirect("/user/sign-in");
      }

      const userId = req.session.user.id;
      const currentUser = await User.findById(userId).lean();

      if (!currentUser) {
        // Handle if user is not found
        return res.status(404).send("User not found");
      }
      req.session.user = {
        ...req.session.user,
        accountType: user.accountType,
      };

      const id = req.params.id;
      // Check if the ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.redirect("/"); // Or you might want to render an error page
      }

      // Fetch the current course and more courses
      let [matchedCourse, moreCourses] = await Promise.all([
        Course.findById(id).populate("user").lean(),
        Course.find().populate("user").limit(4).lean(), // Fetch more courses
      ]);

      // Check if the current course was found
      if (!matchedCourse) {
        return res.redirect("/"); // Or you might want to render a 404 page
      }
      if (user) {
        const currentCart = await Cart.findOne({ user: user.id });
        matchedCourse.addedToWishlist = matchedCourse.favUsers
          .map((favUser) => favUser.toString()) // Convert ObjectIds to strings
          .includes(user.id.toString()); // Convert user._id to a string
        matchedCourse.addedToCart = currentCart.courses
          .map((course) => course.toString())
          .includes(matchedCourse._id.toString());
        if (matchedCourse.inTrialUsers) {
          matchedCourse.inTrial = matchedCourse.inTrialUsers
            .map((userId) => userId.toString())
            .includes(user.id.toString());
        }
      }
      // Filter out the current course from the moreCourses list
      const filteredMoreCourses = moreCourses.filter(
        (course) => course._id.toString() !== id,
      );

      res.render("course/course-profile", {
        title: "Course Details",
        styles: ["course/course-profile.css", "bootstrap_v5.css"],
        user: req.session.user,
        userJson: JSON.stringify(user),
        currentUser: user,
        course: matchedCourse,
        moreCourses: filteredMoreCourses, // Pass the filtered list
        isLearner: user.accountType === "LEARNER",
      });
    } catch (e) {
      next(e);
    }
  }

  // [DELETE] /course/:id
  async delete(req, res, next) {
    try {
      const courseId = req.params.id;
      await Course.findByIdAndDelete(courseId); // Delete the course by ID
      res.redirect("/instructor/courses"); // Redirect to courses list after deletion
    } catch (e) {
      next(e);
    }
  }

  async addToFav(req, res, next) {
    try {
      const courseId = req.params.id;
      const userId = req.session.user.id;

      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).send("Course not found");
      }
      // Check if the user is already in the favUsers list
      const isFav = course.favUsers.includes(userId);
      if (isFav) {
        // If the user is in the list, remove them
        await Course.findByIdAndUpdate(courseId, {
          $pull: { favUsers: userId },
        });
      } else {
        // If the user is not in the list, add them
        await Course.findByIdAndUpdate(courseId, {
          $addToSet: { favUsers: userId },
        });
      }
      const referer = req.get("referer") || "/"; // Default to homepage if no referer is found
      res.redirect(referer);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  async addToCart(req, res, next) {
    try {
      const courseId = req.params.id;
      const userId = req.session.user.id;

      // Find the user's cart (create a new one if it doesn't exist)
      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        // If no cart exists, create a new one for the user
        cart = new Cart({
          user: userId,
          courses: [courseId], // Add the course to the cart
        });
      } else {
        // Check if the course is already in the cart
        const courseIndex = cart.courses.indexOf(courseId);

        if (courseIndex === -1) {
          // Course is not in the cart, so add it
          cart.courses.push(courseId);
        } else {
          // Course is already in the cart, so remove it
          cart.courses.splice(courseIndex, 1);
        }
      }
      // Save the cart (either newly created or updated)
      await cart.save();
      const referer = req.get("referer") || "/"; // Default to homepage if no referer is found
      res.redirect(referer);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async payment(req, res, next) {
    try {
      const userId = req.session.user.id;
      const cart = await Cart.findOne({ user: userId }).populate("courses");
      const courses = cart.courses;

      // Add the user to the enrolledUsers array of each course
      await Promise.all(
        courses.map(async (course) => {
          await Course.findByIdAndUpdate(course._id, {
            $addToSet: { enrolledUsers: userId }, // Use $addToSet to avoid duplicates
          });
        }),
      );

      res.redirect("/thank-you");
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  async trial(req, res, next) {
    try {
      const courseId = req.params.id; // Course ID from the request params
      const userId = req.session.user.id; // User ID from session (or from elsewhere)

      // Validate if the courseId and userId are valid ObjectId
      if (
        !mongoose.Types.ObjectId.isValid(courseId) ||
        !mongoose.Types.ObjectId.isValid(userId)
      ) {
        return res.status(400).send("Invalid course or user ID");
      }

      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send("User not found");
      }

      // Check if the course is already in the trialCourses array
      const isCourseInTrial = user.trialCourses.some(
        (trial) => trial.course.toString() === courseId,
      );

      if (isCourseInTrial) {
        // Remove the course from the trialCourses array
        user.trialCourses = user.trialCourses.filter(
          (trial) => trial.course.toString() !== courseId,
        );

        // Save the updated user document
        await user.save();

        // Remove the user from the inTrialUsers array of the Course
        await Course.findByIdAndUpdate(
          courseId,
          { $pull: { inTrialUsers: userId } }, // $pull removes the user from the array
          { new: true }, // Return the updated document
        );

        const referer = req.get("referer") || "/"; // Default to homepage if no referer is found
        return res.redirect(referer);
      }

      // If the course is not in trial, add it to the trialCourses array
      user.trialCourses.push({
        course: courseId,
        addedAt: new Date(), // You can use Date.now() as well
      });

      // Save the updated user document
      await user.save();

      // Update the Course model to add the user to inTrialUsers
      await Course.findByIdAndUpdate(
        courseId,
        { $addToSet: { inTrialUsers: userId } }, // Use $addToSet to avoid duplicates
        { new: true }, // Return the updated document
      );

      const referer = req.get("referer") || "/"; // Default to homepage if no referer is found
      return res.redirect(referer);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

module.exports = new CourseController();
