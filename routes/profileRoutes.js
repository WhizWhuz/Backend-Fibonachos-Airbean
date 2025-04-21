const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, profileController.getUserOrders);

module.exports = router;
