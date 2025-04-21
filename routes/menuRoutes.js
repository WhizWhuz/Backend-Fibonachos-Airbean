const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const {
	validateAddMenuItem,
	validateUpdateMenuItem,
} = require("../middleware/validateMenuBody");
const adminRoleValidator = require("../middleware/adminRoleValidator");

router
	.route("/")
	.get(menuController.getAllMenuItems)
	.post(adminRoleValidator, validateAddMenuItem, menuController.addMenuItem);

router
	.route("/:id")
	.patch(
		adminRoleValidator,
		validateUpdateMenuItem,
		menuController.updateMenuItem
	)
	.delete(adminRoleValidator, menuController.deleteMenuItem);

module.exports = router;
