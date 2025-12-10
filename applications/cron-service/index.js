"use strict";

require("dotenv").config();
const cron = require("node-cron");
const axios = require("axios");
const IORedis = require("ioredis");

const GATEWAY = process.env.GATEWAY_URL || "http://localhost:2000";
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const redis = new IORedis(REDIS_URL);

console.log("Cron service started");

// Warm seats cache every minute
cron.schedule("* * * * *", async () => {
  try {
    console.log("[cron] warming seats cache");
    await axios.get(`${GATEWAY}/seats`, { timeout: 10000 });
  } catch (e) {
    console.error("[cron] warm error:", e.message);
  }
});

// Example maintenance: expire unpaid reserved tickets - placeholder
cron.schedule("*/5 * * * *", async () => {
  try {
    console.log("[cron] maintenance tick");
    // call internal endpoints or run DB cleanup
  } catch (e) {
    console.error("[cron] maintenance error:", e.message);
  }
});
