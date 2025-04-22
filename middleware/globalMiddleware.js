const globalMiddleware = {
  // Logging middleware
  requestLogger: (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  },

  // Security headers middleware
  securityHeaders: (req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  },

  // Request timing middleware
  requestTimer: (req, res, next) => {
    req.startTime = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - req.startTime;
      console.log(`Request to ${req.url} took ${duration}ms`);
    });
    next();
  },

  // Error handling middleware
  errorHandler: (err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  },

  // Not found middleware
  notFound: (req, res, next) => {
    res.status(404).json({
      success: false,
      message: `Route ${req.originalUrl} not found`,
    });
  },
};

module.exports = globalMiddleware;
