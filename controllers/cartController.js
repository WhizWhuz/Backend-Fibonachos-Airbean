const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");

exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { items } = req.body;

  try {
    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "Items must be an array" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    for (const { menuItemId, quantity } of items) {
      const menuItem = await MenuItem.findById(menuItemId);
      if (!menuItem) continue;

      const itemIndex = cart.items.findIndex(
        (item) => item.menuItem.toString() === menuItemId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ menuItem: menuItemId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "🧺 Cart updated", cart });
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET CART
exports.getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId })
      .select("-__v")
      .populate({
        path: "items.menuItem",
        select: "name description price",
      })
      .lean();
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const totalPrice = cart.items.reduce((sum, item) => {
      const itemPrice = item.menuItem.price || 0;
      return sum + itemPrice * item.quantity;
    }, 0);

    res.status(200).json({
      cart: {
        ...cart,
        totalPrice,
      },
    });
  } catch (error) {
    console.error("❌ Error retrieving cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// REMOVE FROM CART
exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { menuItemId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.menuItem.toString() !== menuItemId
    );

    await cart.save();
    res.status(200).json({ message: "✅ Item removed from cart", cart });
  } catch (error) {
    console.error("❌ Error removing from cart", error);
    res.status(500).json({ message: "Server error" });
  }
};
