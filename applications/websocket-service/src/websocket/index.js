// "use strict";

// const WebSocket = require("ws");
// const { authenticate } = require("./auth");
// const { onConnect, onClose } = require("./connection");
// const { routeMessage } = require("./router");

// function initWebSocket(server) {
//   const wss = new WebSocket.Server({ server });

//   wss.on("connection", (ws, req) => {
//     try {
//       ws.user = authenticate(req);
//       onConnect(ws);

//       ws.on("message", msg => routeMessage(ws, msg));
//       ws.on("close", () => onClose(ws));
//     } catch (err) {
//       ws.close();
//     }
//   });
// }

// module.exports = { initWebSocket };
