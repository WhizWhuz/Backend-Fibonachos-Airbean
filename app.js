const express = require("express");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const cartRoutes = require("./routes/cartRoutes");
const globalMiddleware = require("./middleware/globalMiddleware");


// FRÅGA OM DETTTA BEHÖVS ?
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

//::::::::::::::: FROM  THE GLOBAL MIDDLEWARE FILE
app.use(globalMiddleware.requestLogger);
app.use(globalMiddleware.securityHeaders);
app.use(globalMiddleware.requestTimer);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/about", aboutRoutes);
app.use("/api/v1/cart", cartRoutes);


//::::::::::::::::::::::::: Error handling
app.use(globalMiddleware.notFound);
app.use(globalMiddleware.errorHandler);

module.exports = app;
