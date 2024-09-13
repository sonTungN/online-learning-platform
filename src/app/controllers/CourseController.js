const Course = require("../models/Course");
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

      res.redirect(`/course/edit-course/${req.params.id}`);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async view(req, res, next) {
    try {
      const id = req.params.id;
      
      // Check if the ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.redirect("/"); // Or you might want to render an error page
      }
      
      // Fetch the current course and more courses
      const [matchedCourse, moreCourses] = await Promise.all([
        Course.findById(id).populate("user").lean(),
        Course.find().populate("user").limit(4).lean(), // Fetch more courses
      ]);
  
      // Check if the current course was found
      if (!matchedCourse) {
        return res.redirect("/"); // Or you might want to render a 404 page
      }
      
      // Filter out the current course from the moreCourses list
      const filteredMoreCourses = moreCourses.filter(course => course._id.toString() !== id);
  
      res.render("course/course-profile", {
        title: "Course Details",
        styles: ["course/course-profile.css", "bootstrap_v5.css"],
        user: req.session.user,
        course: matchedCourse,
        moreCourses: filteredMoreCourses, // Pass the filtered list
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
}

module.exports = new CourseController();
