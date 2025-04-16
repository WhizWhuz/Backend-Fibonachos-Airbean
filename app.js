const express = require("express");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");

// App
const app = express();
app.use(express.json());

// Middleware
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/menu", menuRoutes);

module.exports = app;
