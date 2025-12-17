"use strict";

const { initRedis } = require("../redis/redis.client");
const { redis, pub, sub } = initRedis();

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
