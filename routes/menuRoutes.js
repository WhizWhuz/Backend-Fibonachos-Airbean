const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const {
	validateAddMenuItem,
	validateUpdateMenuItem,
} = require("../middleware/validateMenuBody");
const { validateMenuItemId } = require("../middleware/validateMenuItemId");
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
	.route("/:menuItemId")
	.patch(
		authMiddleware,
		adminRoleValidator,
		validateMenuItemId,
		validateUpdateMenuItem,
		menuController.updateMenuItem
	)
	.delete(
		authMiddleware,
		adminRoleValidator,
		validateMenuItemId,
		menuController.deleteMenuItem
	);

module.exports = router;
