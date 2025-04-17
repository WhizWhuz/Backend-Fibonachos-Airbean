const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const {
	validateAddMenuItem,
	validateUpdateMenuItem,
} = require("../middleware/validateMenuBody");

router
	.route("/")
	.get(menuController.getAllMenuItems)
	.post(validateAddMenuItem, menuController.addMenuItem);

router
	.route("/:id")
	.patch(validateUpdateMenuItem, menuController.updateMenuItem)
	.delete(menuController.deleteMenuItem);

module.exports = router;
