const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    minlength: 6,
  },
  name: {
    type: String,
    default: "Coffee Lover",
  },
  role: {
    type: String,
    enum: ["user", "admin", "barista"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
