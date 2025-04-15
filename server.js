const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

console.log("📡 Mongo URI:", process.env.MONGO_URI);

const app = require("./app");

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB🔗`);
    app.listen(PORT, () => console.log(`👂 Server is listening to ${PORT}`));
  })
  .catch((err) => console.error("‼️ MongoDB Connection Error! ", err.message));
