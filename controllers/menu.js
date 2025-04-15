const express = require("express");
//använder MongoDB compass ist för lokal json fil
const mongoose = require("mongoose");

const app = require("./app");
app.use(express.json());

//ist för att använda testMenu.json skapar jag en Mongoose schema
const menuItemSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

// *** /MENU ***
//getMenuItem
app.get("/menu", async (req, res) => {
	try {
		const menuItems = await MenuItem.find();
		res.json(menuItems);
	} catch (err) {
		res.status(500).json({ error: "Could not fetch the menu" });
	}
});

//addMenuItem
app.post("/menu", async (req, res) => {
	try {
		const newItem = new MenuItem(req.body);

		await newItem.save();
		res.status(201).json(newItem);
		console.log(`New menu item added: ${newItem}`);
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: err.message });
	}
});

//updateMenuItem
app.patch("/menu/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const updatedItem = await MenuItem.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!updatedItem) {
			return res
				.status(404)
				.json({ message: `Cannot find product with ID ${id}` });
		}

		res.status(200).json(updatedItem);
	} catch (err) {
		res.status(500).json({ error: "Could not update the item" });
	}
});

/** Next part is still under dev! **/

//deleteMenuItem
app.delete("/menu/:id", async (req, res) => {
	const itemId = req.params.id;
	const index = menu.findIndex((item) => item.id === itemId);

	if (index === -1) {
		return res.status(404).json({ error: "Menu item not found" });
	}

	const deletedItem = menu.splice(index, 1)[0];

	try {
		fs.writeFileSync(menuPath, JSON.stringify(menu, null, 2));
		res.status(201).json({ message: "Menu item deleted", item: deletedItem });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to delete menu item from file" });
	}
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
