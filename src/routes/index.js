const homeRouter = require("./home");
const userRouter = require("./user");
const instructorRouter = require("./instructor");

function route(app) {
  app.use("/user", userRouter);

  app.use("/instructor", instructorRouter);

  app.use("/", homeRouter);
}

module.exports = route;
