"use strict";

const Redis = require("ioredis");
const config = require("../configs/index");
const logger = require("../configs/logger");
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"), // load the .env in service root
});
// Use environment value or fallback
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const redis = new Redis(REDIS_URL, {
  retryStrategy(times) {
    // reconnect after X ms
    return Math.min(times * 50, 2000);
  }
});

// Connection logs
redis.on("connect", () => {
  logger.info("🔌 Redis connected");
});

redis.on("error", (err) => {
  logger.error("❌ Redis error:", err);
});

// Helper: get
const get = async (key) => {
  return await redis.get(key);
};

// Helper: set with TTL
const set = async (key, value, ttlSeconds = 60) => {
  return await redis.set(key, value, "EX", ttlSeconds);
};

// Helper: set JSON
const setJSON = async (key, value, ttlSeconds = 60) => {
  return await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
};

// Helper: get JSON
const getJSON = async (key) => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

// Helper: delete key
const del = async (key) => {
  return await redis.del(key);
};

module.exports = {
  redis,
  get,
  set,
  getJSON,
  setJSON,
  del
};
