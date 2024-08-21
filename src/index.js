const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const port = 3000;

const route = require("./routes/index");
const db = require("./config/db");

// STATIC FILES
app.use(express.static(path.join(__dirname, "/public")));

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// APPLICATION/JSON PARSING
app.use(express.json());

// EXPRESS HANDLEBARS CONFIGURATION
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/resources/views"));

// DATABASE CONNECTION
db.connect();

// APPLICATION ROUTER from src/routes
route(app);

app.listen(port, () => {
  console.log(`Server starts on http://localhost:${port}/`);
});
