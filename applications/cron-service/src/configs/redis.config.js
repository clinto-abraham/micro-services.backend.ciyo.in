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

      db: REDIS_DB || 5,

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



// "use strict";

// const { Redis } = require("ioredis");

// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   maxRetriesPerRequest: null
// });

// module.exports = redis;


// const cron = require("node-cron");
// const axios = require("axios");
// const IORedis = require("ioredis");

// const GATEWAY = process.env.GATEWAY_URL || "http://localhost:2000";
// const REDIS_URL = process.env.REDIS_URL || "redis://:redisIsStartedOnDec15Of2025@127.0.0.1:6379";
// const redis = new IORedis(REDIS_URL);