const express = require("express");

const path = require("path");

const app = express();
const port = 3000;

const hbs = require("hbs");
const collection = require("./mongodb");
const { profile } = require("console");

const templatePath = path.join(__dirname, "../templates");

//CSS Handle
const publicPath = path.join(__dirname, "../public"); // Ensure publicPath is defined here

// Set the public folder to serve static files
app.use(express.static(publicPath)); // Now publicPath is defined

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

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
