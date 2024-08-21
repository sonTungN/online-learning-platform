const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  profileImg: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true, minLength: 4, maxLength: 6 },
  country: { type: String, required: true },
  accountType: {
    type: String,
    required: true,
    enum: ["instructor", "learner"],
  },
  schoolName: {
    type: String,
    required: () => this.accountType === "instructor",
  },
  jobTitle: { type: String, required: () => this.accountType === "instructor" },
  specialization: {
    type: [String],
    required: () => this.accountType === "instructor",
  },
});

module.exports = mongoose.model("User", User);
