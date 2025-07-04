const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");
const cartValidator = require("../middleware/cartValidator");
const { validateMenuItemId } = require("../middleware/validateMenuItemId");

router.use(authMiddleware);

router
  .route("/")
  .post(cartValidator, cartController.addToCart)
  .get(cartController.getCart);

router.delete("/clear", cartController.deleteCart);

router
  .route("/:menuItemId")
  .delete(validateMenuItemId, cartController.removeFromCart);

module.exports = router;
