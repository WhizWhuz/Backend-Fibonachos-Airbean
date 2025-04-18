const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("About", aboutSchema);
