"use strict";

const WebSocket = require("ws");
const logger = require("../utils/logger");

const { authenticate } = require("./auth");
const { onConnect, onClose } = require("./connection");
const { routeMessage } = require("./router");

/**
 * Initialize WebSocket server and bind it to existing HTTP server
 */
function initWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  logger.info("WebSocket layer initialized");

  wss.on("connection", (ws, req) => {
    try {
      // 1️⃣ Authenticate client
      const user = authenticate(req);
      ws.user = user;

      // 2️⃣ Register socket
      onConnect(ws);

      // 3️⃣ Incoming client messages
      ws.on("message", (message) => {
        routeMessage(ws, message);
      });

      // 4️⃣ Client disconnected
      ws.on("close", () => {
        onClose(ws);
      });

      // 5️⃣ Handle WS-level errors
      ws.on("error", (err) => {
        logger.error("WebSocket error:", err.message);
      });

    } catch (err) {
      logger.error("WebSocket connection rejected:", err.message);
      ws.close(4001, "Unauthorized");
    }
  });
}

module.exports = { initWebSocket };
