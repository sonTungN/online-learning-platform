const homeRouter = require("./home");
const userRouter = require("./user");

function route(app) {
  app.use("/user", userRouter);

  app.use("/", homeRouter);
}

module.exports = route;
