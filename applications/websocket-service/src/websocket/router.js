"use strict";

const chat = require("../handlers/chat.handler");

function routeMessage(ws, raw) {
  const data = JSON.parse(raw);

  switch (data.type) {
    case "JOIN_ROOM":
      return chat.joinRoom(ws, data.roomId);

    case "CHAT":
      return chat.sendMessage(ws, data.message);
  }
}

module.exports = { routeMessage };
