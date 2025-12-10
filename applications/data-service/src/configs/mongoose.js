"use strict";

const mongoose = require("mongoose");
const logger = require("./logger");
const config = require("./index");

const MONGO_URI = config.db.uri;

// const uri = config.db.uri;
console.log("DEBUG: MONGO_URI =", MONGO_URI);


const connectMongo = async () => {
  try {
    // Avoid multiple connections in dev refresh cycles
    if (mongoose.connection.readyState === 1) {
      logger.info("MongoDB already connected.");
      return;
    }

    const result = await mongoose.connect(MONGO_URI, {
      maxPoolSize: 20,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    logger.info("✅ MongoDB connected successfully.");

    return result;
   
  } catch (error) {
    logger.error("❌ MongoDB connection error:", error);
    setTimeout(connectMongo, 5000); // retry after 5 seconds
  }
};

module.exports = connectMongo;
