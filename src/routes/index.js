const homeRouter = require("./home");
const userRouter = require("./user");
const instructorRouter = require("./instructor");
const learnerRouter = require("./learner");
const courseRouter = require("./course");
const adminRouter = require("./admin");
const { adminAuthorize } = require("../middlewares/admin-authorize");
function route(app) {
  app.use("/user", userRouter);

  app.use("/instructor", instructorRouter);

  app.use("/learner", learnerRouter);

  app.use("/course", courseRouter);

  app.use("/admin", adminAuthorize, adminRouter);

  app.use("/", homeRouter);
}

module.exports = route;
