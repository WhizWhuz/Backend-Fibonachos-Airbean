const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	user: {
		//store the _id from "User" - type: mongoose.Schema.Types.ObjectId,
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	items: [
		{
			menuItem: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "MenuItem",
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
		},
	],
	totalPrice: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Order", orderSchema);
