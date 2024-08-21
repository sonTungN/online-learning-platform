const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const port = 3000;

// const hbs = require("hbs");
// const collection = require("./mongodb");
// const { profile } = require("console");

// STATIC FILES
app.use(express.static(path.join(__dirname, "/public")));

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// For parsing application/json
app.use(express.json());

// EXPRESS HANDLEBARS CONFIGURATION
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/resources/views"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    profileImg: req.body.profileImg,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    zipCode: req.body.zipCode,
    country: req.body.country,
    accountType: req.body.accountType,
    schoolName:
      req.body.accountType === "instructor" ? req.body.schoolName : undefined,
    jobTitle:
      req.body.accountType === "instructor" ? req.body.jobTitle : undefined,
    specialization:
      req.body.accountType === "instructor"
        ? req.body.specialization
        : undefined,
  };
  await collection.insertMany([data]);
  res.render("home");
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ email: req.body.email });

    if (check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("Wrong Password");
    }
  } catch (error) {
    res.send("Wrong details");
  }
});

app.listen(port, () => {
  console.log(`Server starts on http://localhost:${port}/`);
});
