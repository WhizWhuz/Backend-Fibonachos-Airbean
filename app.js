const express = require("express");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes");

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

module.exports = app;
