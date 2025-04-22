const express = require("express");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const profileRoutes = require("./routes/profileRoutes");
const globalMiddleware = require("./middleware/globalMiddleware");

// Express
const app = express();
app.use(express.json());

// Global Middleware
app.use(globalMiddleware.requestLogger);
app.use(globalMiddleware.securityHeaders);
app.use(globalMiddleware.requestTimer);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/about", aboutRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/profile", profileRoutes);

// Error handling
app.use(globalMiddleware.notFound);
app.use(globalMiddleware.errorHandler);

module.exports = app;
