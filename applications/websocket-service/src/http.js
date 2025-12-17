"use strict";

const http = require("http");
const { initWebSocket } = require("./websocket/websocket");
const logger = require("./utils/logger");

function createServer() {
  const server = http.createServer((req, res) => {
    if (req.url === "/health") {
      res.writeHead(200);
      return res.end("OK");
    }

    res.writeHead(404);
    res.end();
  });

  initWebSocket(server);

  logger.info("HTTP server initialized");
  return server;
}

module.exports = { createServer };
