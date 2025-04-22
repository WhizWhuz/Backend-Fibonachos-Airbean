const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");

router
	.route("/")
	.get(aboutController.getAbout)
	.put(aboutController.updateAbout); // using same route for PUT

module.exports = router;
