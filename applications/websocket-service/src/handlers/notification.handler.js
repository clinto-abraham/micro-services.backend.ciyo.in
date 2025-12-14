"use strict";

function handleNotification(ws, data) {
  ws.send(JSON.stringify(data));
}

module.exports = { handleNotification };
