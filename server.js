// Import dependencies
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

// Load environment variables
dotenv.config();

// MongoDB connection function using docker 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("......MongoDB connected successfully!");
  } catch (error) {
    console.error("......MongoDB connection error:", error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

// Start the server
const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Start the Express server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error.message);
    process.exit(1); // Exit the process if the server fails to start
  }
};

// Initialize the server
startServer();
