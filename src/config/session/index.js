const index = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

function config(app) {
  app.use(
    index({
      secret: "session",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60,
      },
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
      }),
    }),
  );
}

module.exports = { config };
