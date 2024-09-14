const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const route = require("./routes/index");
const db = require("./config/db");
const session = require("./config/session/index");

// STATIC FILES
app.use(express.static(path.join(__dirname, "/public")));

// Use methodOverride middleware
app.use(methodOverride("_method"));

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// APPLICATION/JSON PARSING
app.use(express.json());
// EXPRESS HANDLEBARS CONFIGURATION
app.engine(".hbs", engine({ extname: ".hbs", helpers: {
  eq: function (a, b) {
    return a === b;
  }}} ));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/resources/views"));

// DATABASE CONNECTION
db.connect();

// SESSION CONFIG
session.config(app);

// APPLICATION ROUTER from src/routes
route(app);

app.listen(port, () => {
  console.log(`Server starts on http://localhost:${port}/`);
});
