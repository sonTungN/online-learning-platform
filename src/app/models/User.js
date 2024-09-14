const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { emailPattern, phonePattern } = require("../../utils/pattern");

const User = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: (value) => emailPattern.test(value),
  },

  phone: {
    type: String,
    required: true,
    validate: (value) => phonePattern.test(value.replace(/\D/g, "")),
  },

  password: { type: String, required: true, minLength: 3 },

  profileImg: { type: String, default: "none" },

  firstName: { type: String, required: true, minlength: 2, maxlength: 15 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 15 },
  address: { type: String, required: true, maxlength: 255 },
  city: { type: String, required: true, maxlength: 20 },
  zipcode: { type: String, required: true, minLength: 4, maxLength: 6 },
  country: { type: String, required: true },
  createdAt: Date,
  accountType: {
    type: String,
    required: true,
    enum: ["LEARNER", "INSTRUCTOR", "GUEST"],
  },

  schoolName: {
    type: String,
    required: function () {
      return this.accountType === "INSTRUCTOR";
    },
  },

  jobTitle: {
    type: String,
    required: function () {
      return this.accountType === "INSTRUCTOR";
    },
  },

  specialization: {
    type: [String],
    required: function () {
      return this.accountType === "INSTRUCTOR";
    },
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
  // Add a list of courses created by this user (optional)
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],

  // Add a list of courses wishlisted by this user (optional)
  favCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],

  // Add a list of courses enrolled by this user (optional)
  enrolledCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  trialCourses: [
    {
      course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
      addedAt: {
        type: Date,
        default: Date.now
      },
    },
  ],

  favInstructors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  favByUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("User", User);
