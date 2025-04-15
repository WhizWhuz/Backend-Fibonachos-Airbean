const express = require("express");
const router = express.Router();
//använder MongoDB compass ist för lokal json fil
const mongoose = require("mongoose");

//ist för att använda testMenu.json skapar jag en Mongoose schema
const menuItemSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

// *** /MENU ***
//getMenuItem
router.get("/menu", async (req, res) => {
	try {
		const menuItems = await MenuItem.find();
		res.json(menuItems);
	} catch (err) {
		res.status(500).json({ error: "Could not fetch the menu" });
	}
});

//addMenuItem
router.post("/menu", async (req, res) => {
	try {
		const newItem = new MenuItem(req.body);

		await newItem.save();
		res.status(201).json(newItem);
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: err.message });
	}
});

//updateMenuItem
router.patch("/menu/:id", async (req, res) => {
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

//deleteMenuItem
router.delete("/menu/:id", async (req, res) => {
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

module.exports = router;
