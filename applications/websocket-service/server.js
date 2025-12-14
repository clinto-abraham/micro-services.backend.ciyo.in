"use strict";

require("./config/env");

const http = require("http");
const { initWebSocket } = require("./websocket");
const { startHealthServer } = require("./http");

const server = http.createServer();
initWebSocket(server);

server.listen(process.env.WS_PORT, () => {
  console.log("🚀 WebSocket running on", process.env.WS_PORT);
});

startHealthServer();



