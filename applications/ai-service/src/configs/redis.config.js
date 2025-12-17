"use strict";

const IORedis = require("ioredis");
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_DB } = require("./env");

let redis;

console.log(8,REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_DB, 8)

function createRedisClient() {
  if (!redis) {
    redis = new IORedis({
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD,
      db: REDIS_DB,
      maxRetriesPerRequest: null, // REQUIRED for BullMQ
      enableReadyCheck: false
    });

    redis.on("connect", () => {
      console.log("🔴 Redis connected");
    });

    redis.on("error", err => {
      console.error("❌ Redis error:", err);
    });
  }

  return redis;
}

module.exports = createRedisClient();
