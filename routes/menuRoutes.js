const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const {
	validateAddMenuItem,
	validateUpdateMenuItem,
} = require("../middleware/validateMenuBody");
const adminRoleValidator = require("../middleware/adminRoleValidator");
const authMiddleware = require("../middleware/authMiddleware");

router
	.route("/")
	.get(menuController.getAllMenuItems)
	.post(
		authMiddleware,
		adminRoleValidator,
		validateAddMenuItem,
		menuController.addMenuItem
	);

router
	.route("/:id")
	.patch(
		authMiddleware,
		adminRoleValidator,
		validateUpdateMenuItem,
		menuController.updateMenuItem
	)
	.delete(authMiddleware, adminRoleValidator, menuController.deleteMenuItem);

module.exports = router;
