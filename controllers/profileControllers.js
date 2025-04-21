const Order = require("../models/Order");

exports.getUserOrders = async (req, res) => {
	const userId = req.user.id;

	try {
		const userOrders = await Order.find({ user: userId }).populate("user");

		const userTotalSpent = userOrders.reduce((sum, order) => {
			return sum + order.totalPrice;
		}, 0);

		const orderHistory = userOrders.map((order) => ({
			orderId: order._id,
			totalPrice: order.totalPrice,
			createdAt: order.createdAt.toLocaleDateString("sv-SE"),
		}));

		//Logged in user is always [0] in array
		const userName = userOrders[0].user.name;

		res.status(200).json({
			user: userName,
			message: "All user orders fetched",
			orderHistory,
			userTotalSpent,
		});
	} catch (error) {
		console.error("Error retrieving orders:", error);
		res.status(500).json({ message: "Server error" });
	}
};
