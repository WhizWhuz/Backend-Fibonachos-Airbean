const mongoose = require("mongoose");

const menuItem = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
});

module.exports = mongoose.model("MenuItem", menuItem);
