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
			//...STATUS + ESTIMATED TIME
			status: 'pending',
			estimatedTime: 15 // default 15 minutes
		});

		currentCart.items = [];
		await currentCart.save();

		res.status(200).json({
			message: "Order placed & cart emptied",
			orderId: newOrder._id,
			totalPrice: newOrder.totalPrice,
			createdAt: newOrder.createdAt,
			status: newOrder.status,
			estimatedTime: newOrder.estimatedTime
		});
	} catch (error) {
		console.error("Error retrieving order:", error);
		res.status(500).json({ message: "Server error" });
	}
};

exports.getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find()
			.populate("user", "name email")
			.populate("items.menuItem", "name price");
		res.status(200).json({ orders });
	} catch (err) {
		console.error("Error getting orders: ", err);
		res.status(500).json({ message: "Server error" });
	}
};

// Get order status
exports.getOrderStatus = async (req, res) => {
	try {
		const orderId = req.params.orderId;
		const order = await Order.findById(orderId)
			.populate("user", "name email")
			.populate("items.menuItem", "name price");

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		// Calculate time left
		const timeElapsed = Math.floor((Date.now() - order.createdAt) / (1000 * 60)); // in minutes
		const timeLeft = Math.max(0, order.estimatedTime - timeElapsed);

		res.status(200).json({
			orderId: order._id,
			status: order.status,
			timeLeft: timeLeft,
			items: order.items,
			totalPrice: order.totalPrice,
			createdAt: order.createdAt
		});
	} catch (err) {
		console.error("Error getting order status:", err);
		res.status(500).json({ message: "Server error" });
	}
};

// Update order status (for baristas/admins)
exports.updateOrderStatus = async (req, res) => {
	try {
		const { orderId } = req.params;
		const { status, estimatedTime } = req.body;

		const order = await Order.findById(orderId);
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		if (status) order.status = status;
		if (estimatedTime) order.estimatedTime = estimatedTime;

		await order.save();

		res.status(200).json({
			message: "Order status updated",
			orderId: order._id,
			status: order.status,
			estimatedTime: order.estimatedTime
		});
	} catch (err) {
		console.error("Error updating order status:", err);
		res.status(500).json({ message: "Server error" });
	}
};
