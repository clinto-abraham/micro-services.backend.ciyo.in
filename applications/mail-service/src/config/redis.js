"use strict";

const IORedis = require("ioredis");

module.exports = new IORedis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});
