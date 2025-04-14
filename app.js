const express = require("express");

const app = express();

// Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// Routes
