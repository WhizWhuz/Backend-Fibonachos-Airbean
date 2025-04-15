const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router
	.route("/menu")
	.get(menuController.getMenuItems)  // Corrected to match the function name
	.post(menuController.addMenuItem);

router
	.route("/menu/:id")
	.patch(menuController.updateMenuItem)
	.delete(menuController.deleteMenuItem);

module.exports = router;
