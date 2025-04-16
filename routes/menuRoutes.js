const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router
	.route("/")
	.get(menuController.getAllMenuItems)
	.post(menuController.addMenuItem);

router
	.route("/:id")
	.patch(menuController.updateMenuItem)
	.delete(menuController.deleteMenuItem);

module.exports = router;