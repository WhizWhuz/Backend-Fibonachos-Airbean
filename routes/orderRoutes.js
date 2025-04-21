const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderControllers");
const adminRoleValidator = require("../middleware/adminRoleValidator");

// Place new order
router.post("/", authMiddleware, orderController.placeOrder);

// Get all orders (admin only)
router.get(
	"/all",
	authMiddleware,
	adminRoleValidator,
	orderController.getAllOrders
);

// Get order status
router.get("/status/:orderId", authMiddleware, orderController.getOrderStatus);

// Update order status (admin only)
router.patch(
	"/status/:orderId",
	adminRoleValidator,
	authMiddleware,
	orderController.updateOrderStatus
);

module.exports = router;
