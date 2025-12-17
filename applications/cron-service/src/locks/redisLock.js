"use strict";
const redis = require("../configs/redis.config");

exports.acquire = async (key) => {
  const lockKey = `cron-lock:${key}`;
  return await redis.set(lockKey, "1", "NX", "EX", 300);
};

exports.release = async (key) => {
  await redis.del(`cron-lock:${key}`);
};
