"use strict";

const IORedis = require("ioredis");
const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  REDIS_DB
} = require("./env");

let redis;

function createRedisClient() {
  if (!redis) {
    redis = new IORedis({
      host: REDIS_HOST,
      port: REDIS_PORT,

      // 🔥 REQUIRED for Redis 6+
      username: REDIS_USERNAME || "default",
      password: REDIS_PASSWORD,

      db: REDIS_DB || 0,

      // 🔥 REQUIRED for BullMQ
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });

    redis.on("connect", () => {
      console.log("🔴 Redis connected");
    });

    redis.on("error", (err) => {
      console.error("❌ Redis error:", err.message);
    });
  }

  return redis;
}

module.exports = createRedisClient;
