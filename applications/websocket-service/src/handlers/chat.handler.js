"use strict";

const { pub } = require("../redis/client");

async function joinRoom(ws, roomId) {
  ws.roomId = roomId;
}

async function sendMessage(ws, message) {
  await pub.publish(
    `room:${ws.roomId}`,
    JSON.stringify({
      type: "CHAT",
      from: ws.user.id,
      text: message
    })
  );
}

module.exports = { joinRoom, sendMessage };
