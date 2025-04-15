const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const menuPath = path.join(__dirname, "../testMenu.json");

const rawMenu = fs.readFileSync(menuPath);
const menu = JSON.parse(rawMenu);

// *** /MENU ***
//getMenuItem
app.get("/menu", async (req, res) => {
	res.json(menu);
});

//addMenuItem
app.post("/menu", async (req, res) => {
	const { id, name, description, price } = req.body;

	if (!id || !name || !description || typeof price !== "number") {
		return res.status(400).json({ error: "Invalid input" });
	}

	const newMenuItem = { id, name, description, price };

	menu.push(newMenuItem);

	try {
		fs.writeFileSync(menuPath, JSON.stringify(menu, null, 2));
		res.status(201).json({ message: "Menu item added", item: newMenuItem });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to save menu item to file" });
	}
});

//updateMenuItem
app.patch("/menu/:id", async (req, res) => {
	const itemId = req.params.id;
	const { name, description, price } = req.body;

	const index = menu.findIndex((item) => item.id === itemId);

	if (index === -1) {
		return res.status(404).json({ error: "Menu item not found" });
	}

	if (name) menu[index].name = name;
	if (description) menu[index].description = description;
	if (typeof price === "number") menu[index].price = price;

	try {
		fs.writeFileSync(menuPath, JSON.stringify(menu, null, 2));
		res.status(201).json({ message: "Menu item updated", item: menu[index] });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to save updated menu item to file" });
	}
});

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
