const Cart = require("../models/Cart");

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
