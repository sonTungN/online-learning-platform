const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },

  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500,
  },

  level: { type: String, required: true, minLength: 3, maxlength: 50 },

  category: { type: String, required: true, minLength: 3, maxlength: 50 },

  courseImg: { type: String, required: true },
  price: { type: Number, required: true, minlength: 2, maxlength: 15 },
  createdAt: Date,

  // Add a reference to the User schema
  user: {
    type: Schema.Types.ObjectId, // The user's ObjectId
    ref: "User", // Reference to the User model
    required: true, // Course must be associated with a user
  },

  favUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  enrolledUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  inTrialUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  carts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],
});

module.exports = mongoose.model("Course", Course);
