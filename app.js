const express = require("express");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const cartRoutes = require("./routes/cartRoutes");

// App
const app = express();
app.use(express.json());

// Middleware to track request time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/about", aboutRoutes);
app.use("/api/v1/cart", cartRoutes);

module.exports = app;
