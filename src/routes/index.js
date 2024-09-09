const homeRouter = require("./home");
const userRouter = require("./user");
const instructorRouter = require("./instructor");
const learnerRouter = require("./learner");
const courseRouter = require("./course");

function route(app) {
  app.use("/user", userRouter);

  app.use("/instructor", instructorRouter);

  app.use("/learner", learnerRouter);

  app.use("/course", courseRouter);

  app.use("/", homeRouter);
}

module.exports = route;
