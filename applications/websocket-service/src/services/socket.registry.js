"use strict";

const { initRedis } = require("../redis/redis.client");
const { redis } = initRedis();

/**
 * In-memory socket registry
 * userId -> Set<ws>
 */
const sockets = new Map();

/**
 * ⏱ TTL for Redis presence (seconds)
 * Auto-cleanup on crash
 */
const PRESENCE_TTL = 60;

/**
 * Add socket to user
 */
async function addUser(userId, socketId) {
  const key = `user:${userId}`;

  // Store socketId with TTL
  await redis.set(key, socketId, "EX", PRESENCE_TTL);
}

/**
 * Refresh TTL (heartbeat)
 */
async function refreshUser(userId) {
  await redis.expire(`user:${userId}`, PRESENCE_TTL);
}

/**
 * Remove user presence
 */
async function removeUser(userId) {
  await redis.del(`user:${userId}`);
}

/**
 * Register socket in memory
 */
function register(userId, ws) {
  const key = String(userId);

  if (!sockets.has(key)) {
    sockets.set(key, new Set());
  }

  sockets.get(key).add(ws);
}

/**
 * Unregister socket
 */
function unregister(userId, ws) {
  const key = String(userId);

  if (!sockets.has(key)) return;

  const set = sockets.get(key);
  set.delete(ws);

  if (set.size === 0) {
    sockets.delete(key);
  }
}

/**
 * Get all sockets for a user
 */
function getSockets(userId) {
  return sockets.get(String(userId)) || new Set();
}

/**
 * Get all active sockets
 */
function getAllSockets() {
  return [...sockets.values()].flat();
}

module.exports = {
  addUser,
  refreshUser,
  removeUser,
  register,
  unregister,
  getSockets,
  getAllSockets,
};
