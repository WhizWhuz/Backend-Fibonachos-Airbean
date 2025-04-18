const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
	const userId = req.user.id;

	try {
		//.populate - gives the whole menuItem info to current cart objects
		const currentCart = await Cart.findOne({ user: userId }).populate(
			"items.menuItem"
		);
		const currentOrderItems = currentCart.items;

		const orderTotal = currentCart.items.reduce((sum, item) => {
			return sum + item.menuItem.price * item.quantity;
		}, 0);

		const newOrder = await Order.create({
			user: userId,
			items: currentOrderItems,
			totalPrice: orderTotal,
		});

		currentCart.items = [];
		await currentCart.save();

		res.status(200).json({
			message: "Order placed & cart emptied",
			orderId: newOrder._id,
			totalPrice: newOrder.totalPrice,
			createdAt: newOrder.createdAt,
		});
	} catch (error) {
		console.error("Error retrieving order:", error);
		res.status(500).json({ message: "Server error" });
	}
};
