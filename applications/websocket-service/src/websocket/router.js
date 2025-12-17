"use strict";

const chat = require("../handlers/chat.handler");
const logger = require("../utils/logger");

function routeMessage(ws, raw) {
  let data;

  try {
    data = JSON.parse(raw);
  } catch (err) {
    logger.warn("Invalid WS payload");
    return;
  }

  switch (data.type) {
    case "JOIN_ROOM":
      return chat.joinRoom(ws, data.roomId);

    case "CHAT":
      return chat.sendMessage(ws, data.message);

    default:
      logger.warn("Unknown WS message type:", data.type);
  }
}

module.exports = { routeMessage };
