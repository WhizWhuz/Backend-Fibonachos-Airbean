const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const adminRoleValidator = require("../middleware/adminRoleValidator");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/users",
  authMiddleware,
  adminRoleValidator,
  authController.getAllUsers
);

module.exports = router;
