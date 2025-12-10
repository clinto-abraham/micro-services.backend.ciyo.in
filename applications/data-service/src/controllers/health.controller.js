"use strict";

const mongoose = require("mongoose");
// const response = require("../helpers/response");
const config = require("../configs/index");
// const connectMongo = require("../configs/mongoose");

exports.healthCheck = async (req, res) => {
  // Mongoose connection states:
  // 0 = disconnected
  // 1 = connected
  // 2 = connecting
  // 3 = disconnecting
  const mongoState = mongoose.connection.readyState;

  const mongoStatusMap = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
  };

  // Microservice status (here: data-service)
  const serviceStatus = {
    name: "data-service",
    status: "running",
    uptime: process.uptime(),
    environment: config.app.env,
    mongodb_status: mongoStatusMap[mongoState],
    numericState: mongoState,

  };

  // Final Response
  return res.json({
    success: true,
    service: serviceStatus,
    database: {
      status: mongoStatusMap[mongoState],
      numericState: mongoState,
      name: "mongodb"
    },
    timestamp: new Date().toISOString()
  });
};
