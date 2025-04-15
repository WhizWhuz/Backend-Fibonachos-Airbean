const express = require("express");
//använder MongoDB compass ist för lokal json fil
const mongoose = require("mongoose");

mongoose
	.connect("mongodb://127.0.0.1:27017/AirbeanBackendTest")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Couldnt connect to MongoDB: ", err));

const app = express();
app.use(express.json());

const menuPath = path.join(__dirname, "../testMenu.json");

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
