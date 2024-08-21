const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect("mongodb://localhost:27017/LoginSignUpTutorial")
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log("DB Connection Error: ", err));
}

module.exports = { connect };
