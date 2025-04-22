const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");
const authMiddleware = require("../middleware/authMiddleware");
const adminRoleValidator = require("../middleware/adminRoleValidator");

router
  .route("/")
  .get(aboutController.getAbout)
  .put(authMiddleware, adminRoleValidator, aboutController.updateAbout);

module.exports = router;
