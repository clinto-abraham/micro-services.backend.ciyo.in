"use strict";

require("dotenv").config();
const express = require("express");
const config = require("./src/configs");
const connectMongo = require("./src/configs/mongoose");
const logger = require("./src/configs/logger");
const routes = require("./src/routes");
const security = require("./src/middlewares/security");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

// Middleware
app.use(express.json());
security(app);

// Database connection
connectMongo();

// Routes
app.use("/", routes);

// Final error handler
app.use(errorHandler);

// Start server
app.listen(config.app.port, () => {
  logger.info(`🚀 Data-service running on port ${config.app.port}`);
});

