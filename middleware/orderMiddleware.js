const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.orderMiddleware = async (req, res, next) => {
	const userId = req.user.id;

	try {
		const cart = await Cart.findOne({ user: userId });

		if (!cart || cart.items.length === 0) {
			return res
				.status(400)
				.json({ message: "No items in cart, can't place an order!" });
		}

		next();
	} catch (error) {
		console.error("Cart check failed: ", error);
		res.status(500).json({ message: "Server error" });
	}
};

exports.validateOrderId = async (req, res, next) => {
	const { orderId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(orderId)) {
		return res.status(400).json({
			success: false,
			message: `Invalid ID format: ${orderId}`,
		});
	}

	const order = await Order.findById(orderId);
	if (!order) {
		return res.status(404).json({
			success: false,
			message: `Order with ID ${orderId} not found`,
		});
	}
	next();
};
