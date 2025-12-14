"use strict";

const { redis } = require("../redis/client");

async function addUser(userId, socketId) {
  await redis.set(`user:${userId}`, socketId);
}

async function removeUser(userId) {
  await redis.del(`user:${userId}`);
}

module.exports = { addUser, removeUser };
