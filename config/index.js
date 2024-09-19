const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    connected = true;
    console.log("MongoDB connected ...");
  } catch (err) {
    console.log("error :", err);
  }
};

module.exports = connectDB;
