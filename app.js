const express = require("express");
const jwt = require("jsonwebtoken");

// App

const app = express();

// Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// Routes

module.exports = app;
