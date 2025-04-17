const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");
const cartValidator = require("../middleware/cartValidator");

router.use(authMiddleware);

router
  .route("/")
  .post(cartValidator, cartController.addToCart)
  .get(cartController.getCart)
  .delete(cartController.removeFromCart);

module.exports = router;
