const MenuItem = require("../models/MenuItem");
const mongoose = require("mongoose");

exports.validateMenuItemId = async (req, res, next) => {
	const { menuItemId } = req.params;

	//have to check if the format of ObjectId is correct first. isValid is mongoose helper
	//if the id is too short/long this error will be displayed
	if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
		return res.status(400).json({
			success: false,
			message: `Invalid ID format: ${menuItemId}`,
		});
	}

	const item = await MenuItem.findById(menuItemId);

	if (!item) {
		return res
			.status(404)
			.json({ message: `Menu item with id ${menuItemId} not found` });
	}
	next();
};
