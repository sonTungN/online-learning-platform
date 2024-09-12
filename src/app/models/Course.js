const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
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
});

module.exports = mongoose.model("Course", Course);
