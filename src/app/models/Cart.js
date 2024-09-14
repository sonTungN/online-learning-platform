const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema({
  user: {
    type: Schema.Types.ObjectId, // The user's ObjectId
    ref: "User", // Reference to the User model
    required: true, // Course must be associated with a user
  },
  courses: [
    {
      type: Schema.Types.ObjectId, // The product's ObjectId
      ref: "Course", // Reference to the Product model
    },
  ],
});

module.exports = mongoose.model("Cart", Cart);
