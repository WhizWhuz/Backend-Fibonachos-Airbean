exports.getMenuItem("/menu", async (req, res) => {
	try {
		const menuItems = await MenuItem.find();
		res.json(menuItems);
	} catch (err) {
		res.status(500).json({ error: "Could not fetch the menu" });
	}
});

exports.addMenuItem("/menu", async (req, res) => {
	try {
		const newItem = new MenuItem(req.body);

		await newItem.save();
		res.status(201).json(newItem);
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: err.message });
	}
});

exports.updateMenuItem("/menu/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const updatedItem = await MenuItem.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!updatedItem) {
			return res
				.status(404)
				.json({ message: `Cannot find item with ID ${id}` });
		}

		res.status(200).json(updatedItem);
	} catch (err) {
		res.status(500).json({ error: "Could not update the item" });
	}
});

exports.deleteMenuItem("/menu/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const deletedItem = await MenuItem.findByIdAndDelete(id);

		if (!deletedItem) {
			console.log(`Cannot find the item with ID ${id}`);
			return res
				.status(404)
				.json({ message: `Cannot find item with ID ${id}` });
		}

		res.status(200).json({
			message: "Item deleted successfully",
			item: deletedItem,
		});
	} catch (err) {
		res.status(500).json({ error: "Could not delete the item" });
	}
});
