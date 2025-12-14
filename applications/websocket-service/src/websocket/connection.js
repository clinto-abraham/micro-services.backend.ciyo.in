"use strict";

const { addUser, removeUser } = require("../services/socket.registry");
const logger = require("../utils/logger");

async function onConnect(ws) {
  await addUser(ws.user.id, ws._socket.remotePort);
  logger.info("User connected:", ws.user.id);
}

async function onClose(ws) {
  await removeUser(ws.user.id);
  logger.info("User disconnected:", ws.user.id);
}

module.exports = { onConnect, onClose };
