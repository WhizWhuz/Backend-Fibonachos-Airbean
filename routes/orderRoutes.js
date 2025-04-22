const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderControllers");
const adminRoleValidator = require("../middleware/adminRoleValidator");
const {
	orderMiddleware,
	validateOrderId,
} = require("../middleware/orderMiddleware");

// Place new order
router.post("/", authMiddleware, orderMiddleware, orderController.placeOrder);

// Get all orders (admin only)
router.get(
	"/all",
	authMiddleware,
	adminRoleValidator,
	orderController.getAllOrders
);

// Get order status
router.get(
	"/status/:orderId",
	authMiddleware,
	validateOrderId,
	orderController.getOrderStatus
);

// Update order status (admin only)
router.patch(
	"/status/:orderId",
	authMiddleware,
	adminRoleValidator,
	validateOrderId,
	orderController.updateOrderStatus
);

module.exports = router;
