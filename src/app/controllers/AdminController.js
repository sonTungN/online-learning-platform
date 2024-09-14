
// src/app/controllers/AdminController.js
class AdminController {
    // [GET] /admin
    index(req, res, next) {
      try {
        res.render("admin/index", {
          title: "Admin Dashboard",
          styles: ["admin/admin.css"], // Add relevant styles here
        });
      } catch (e) {
        next(e);
      }
    }
  
    // [GET] /admin/user/add
    addUser(req, res, next) {
      try {
        res.render("admin/user/add", {
          title: "Add New User",
          styles: ["admin/admin.css"], // Add specific styles for the add user page
        });
      } catch (e) {
        next(e);
      }
    }
  
    // [GET] /admin/user/edit/:id
    editUser(req, res, next) {
      const userId = req.params.id;
      try {
        res.render("admin/user/edit", {
          title: "Edit User",
          styles: ["admin/admin.css"], // Add specific styles for the edit user page
          userId,
        });
      } catch (e) {
        next(e);
      }
    }
  
    // [GET] /admin/user/view/:id
    viewUser(req, res, next) {
      const userId = req.params.id;
      try {
        res.render("admin/user/view", {
          title: "View User Details",
          styles: ["admin/admin.css"], // Add specific styles for the view user page
          userId,
        });
      } catch (e) {
        next(e);
      }
    }

      // [GET] /admin/course
  listCourses(req, res, next) {
    try {
      res.render("admin/course", {
        title: "Course List",
        styles: ["admin/admin.css"], // Add specific styles for the course list page
      });
    } catch (e) {
      next(e);
    }
  }

  // [GET] /admin/course/add
  addCourse(req, res, next) {
    try {
      res.render("admin/course/add", {
        title: "Add New Course",
        styles: ["admin/admin.css"], // Add specific styles for the add course page
      });
    } catch (e) {
      next(e);
    }
  }

  // [GET] /admin/course/edit/:id
  editCourse(req, res, next) {
    const courseId = req.params.id;
    try {
      res.render("admin/course/edit", {
        title: "Edit Course",
        styles: ["admin/admin.css"], // Add specific styles for the edit course page
        courseId,
      });
    } catch (e) {
      next(e);
    }
  }

  // [GET] /admin/course/view/:id
  viewCourse(req, res, next) {
    const courseId = req.params.id;
    try {
      res.render("admin/course/view", {
        title: "View Course Details",
        styles: ["admin/admin.css"], // Add specific styles for the view course page
        courseId,
      });
    } catch (e) {
      next(e);
    }
  }

}
  
  module.exports = new AdminController();
  