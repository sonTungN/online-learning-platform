const User = require("../models/User");
const Course = require("../models/Course");
const path = require("path");

class InstructorController {
  // [GET] /instructor/profile
  async profile(req, res, next) {
    try {
      const id = req.session.user.id;
      const user = await User.findById(id)
        .populate("courses") // Populate the courses field
        .lean();
      // Convert createdAt dates to dd/mm/yyyy format
      user.courses = user.courses.map((course) => {
        const date = new Date(course.createdAt);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = date.getFullYear();
        return {
          ...course,
          createdAt: `${day}/${month}/${year}`,
        };
      });
      res.render("instructor/profile", {
        title: "Instructor Profile",
        styles: ["instructor/profile.css", "bootstrap_v5.css"],
        user: req.session.user,
        currentUser: user,
        courses: user.courses || [],
      });
    } catch (e) {
      next(e);
    }
  }

  // [GET] /instructor/edit-profile
  async edit(req, res, next) {
    try {
      const userId = req.session.user.id;

      // Find the user in the database
      const user = await User.findById(userId).lean();

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
        profileLink:
          user.accountType === "LEARNER"
            ? "/learner/profile"
            : "/instructor/profile",
      };
      res.render("instructor/edit-profile", {
        title: "Edit Profile",
        styles: ["instructor/edit-profile.css"],
        user: req.session.user,
        userJson: JSON.stringify(user),
        currentUser: user,
      });
    } catch (e) {
      next(e);
    }
  }

  // [POST] /instructor/edit-profile
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
      res.redirect("/instructor/edit-profile");
    } catch (e) {
      next(e);
    }
  }

  // [GET] /instructor/courses
  async view(req, res, next) {
    try {
      const user = req.session.user;
      const page = req.query.page || 1;
      const count = req.query.count || 5;
      const offset = (page - 1) * count;
      // Get the total number of courses for pagination
      const totalCourses = await Course.countDocuments({ user: user.id });

      // Calculate the total number of pages
      const totalPages = Math.ceil(totalCourses / count);
      // Retrieve the courses for the current page
      const courses = await Course.find({ user: user.id })
        .skip(offset) // Skip courses for previous pages
        .limit(count)
        .lean(); // Limit the number of courses per page
      // Render the instructor courses view, passing the courses and pagination info
      res.render("instructor/courses", {
        title: "My Courses",
        styles: ["instructor/courses.css", "bootstrap_v5.css"],
        user,
        courses,
        currentPage: page,
        totalPages,
      });
    } catch (e) {
      next(e);
    }
  }

  // [GET] /instructor/add-course
  async add(req, res, next) {
    try {
      const userId = req.session.user.id;

      // Find the user in the database
      const user = await User.findById(userId).lean();

      if (!user) {
        // Handle if user is not found
        return res.status(404).send("User not found");
      }
      req.session.user = {
        ...req.session.user,
        displayName: `${user.firstName} ${user.lastName}`,
      };
      res.render("instructor/add-course", {
        title: "Add Course",
        styles: ["instructor/add-course.css"],
        user: req.session.user,
        userJson: JSON.stringify(user),
        currentUser: user,

        isInstructor: user.accountType == "INSTRUCTOR",
      });
    } catch (e) {
      next(e);
    }
  }

  // [POST] /instructor/add-course
  async addCourse(req, res, next) {
    try {
      const body = req.body;
      let profileImgPath;
      if (req.file) {
        profileImgPath = path.join("/assets/uploads/", req.file.filename);
      } else {
        profileImgPath = "/assets/uploads/default.png";
      }
      const formattedBody = {
        ...body,
        courseImg: profileImgPath,
        user: req.session.user.id,
        createdAt: new Date(),
      };
      const course = new Course(formattedBody);
      await course.save().then(
        async (
          course, // Optionally, push the course to the user's `courses` array
        ) =>
          await User.findByIdAndUpdate(req.session.user.id, {
            $push: { courses: course._id },
          }),
      );
      res.redirect("/instructor/courses");
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

module.exports = new InstructorController();
