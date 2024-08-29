const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  profileImg: { type: String, default: "none" },
  firstName: { type: String, required: true, length: 15 },
  lastName: { type: String, required: true, length: 15 },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
  country: { type: String, required: true },

  accountType: {
    type: String,
    required: true,
    enum: ["LEARNER", "INSTRUCTOR"],
  },

  schoolName: {
    type: String,
    required: () => this.accountType === "INSTRUCTOR",
  },

  jobTitle: { type: String, required: () => this.accountType === "INSTRUCTOR" },

  specialization: {
    type: [String],
    required: () => this.accountType === "INSTRUCTOR",
  },
});

module.exports = mongoose.model("User", User);
