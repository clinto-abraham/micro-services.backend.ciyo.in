"use strict";
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({
  path: path.resolve(__dirname, "./.env")
});
async function connect(uri) {
  const u = uri || process.env.MONGO_URI || "mongodb://localhost:27017/seatdb";
  if (mongoose.connection.readyState === 1) return mongoose;
  await mongoose.connect(u, { maxPoolSize: 10 });
  return mongoose;
}

module.exports = { connect };
