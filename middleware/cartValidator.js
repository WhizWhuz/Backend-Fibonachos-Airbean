const MenuItem = require("../models/MenuItem");

module.exports = async function validateCartItems(req, res, next) {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ message: "Items must be an array." });
  }

  for (const item of items) {
    const menuItem = await MenuItem.findById(item.menuItemId);

    if (!menuItem) {
      return res
        .status(404)
        .json({ message: `Item with ID ${item.menuItemId} not found.` });
    }

    if (item.price && item.price !== menuItem.price) {
      return res.status(400).json({
        message: `Price mismatch for item ${menuItem.name}. Expected ${menuItem.price}, got ${item.price}`,
      });
    }
  }
  next();
};
