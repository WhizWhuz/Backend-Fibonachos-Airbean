const MenuItem = require("../models/MenuItem");

exports.getAllMenuItems = async (req, res) => {
	try {
		const menuItems = await MenuItem.find();
		res.json(menuItems);
	} catch (err) {
		res.status(500).json({ error: "Could not fetch the menu" });
	}
};

exports.addMenuItem = async (req, res) => {
	try {
		const newItem = new MenuItem(req.body);

		await newItem.save();
		res.status(201).json(newItem);
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: err.message });
	}
};

exports.updateMenuItem = async (req, res) => {
	const { menuItemId } = req.params;

	try {
		const updatedItem = await MenuItem.findByIdAndUpdate(menuItemId, req.body, {
			new: true,
		});

		res.status(200).json(updatedItem);
	} catch (err) {
		res.status(500).json({ error: "Could not update the item" });
	}
};

exports.deleteMenuItem = async (req, res) => {
	const { menuItemId } = req.params;
	try {
		const deletedItem = await MenuItem.findByIdAndDelete(menuItemId);

		res.status(200).json({
			message: "Item deleted successfully",
			item: deletedItem,
		});
	} catch (err) {
		res.status(500).json({ error: "Could not delete the item" });
	}
};
