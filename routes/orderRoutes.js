const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderControllers");

router.post("/", authMiddleware, orderController.placeOrder);

module.exports = router;
