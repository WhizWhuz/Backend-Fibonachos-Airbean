const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderControllers");
const adminRoleValidator = require("../middleware/adminRoleValidator");

router.post("/", authMiddleware, orderController.placeOrder);
router.post(
	"/all",
	authMiddleware,
	adminRoleValidator,
	orderController.getAllOrders
);

module.exports = router;
