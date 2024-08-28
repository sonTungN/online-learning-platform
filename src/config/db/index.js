const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

function connect() {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log("DB Connection Error: ", err));
}

module.exports = { connect };
