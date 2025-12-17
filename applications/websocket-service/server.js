"use strict";
console.log(`[BOOT] ${process.env.SERVICE_NAME || 'service'} started`);

require("./src/configs/env");

const { createServer } = require("./src/http");
const gracefulShutdown = require("./src/utils/shutdown");
const logger = require("./src/utils/logger");

const PORT = process.env.PORT || 6000;

const server = createServer();

server.listen(PORT, () => {
  logger.info(`🚀 WebSocket service running on port ${PORT}`);
});

/**
 * Graceful shutdown
 */

process.on("SIGTERM", () => gracefulShutdown("SIGTERM", server));
process.on("SIGINT", () => gracefulShutdown("SIGINT", server));

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  gracefulShutdown("unhandledRejection", server);
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  gracefulShutdown("uncaughtException", server);
});
