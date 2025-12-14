"use strict";

require("dotenv").config();
const cron = require("node-cron");
const axios = require("axios");
const IORedis = require("ioredis");

const GATEWAY = process.env.GATEWAY_URL || "http://localhost:2000";
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const redis = new IORedis(REDIS_URL);

const express = require("express");
const app = express();

console.log("Cron service started");

app.get("/health", async (req, res) => {
  res.json({
    ok: true,
    service: "cron-service",
    timestamp: new Date().toISOString()
  });
});

// Warm seats cache every minute
cron.schedule("0 */12 * * *", async () => {
  try {
    console.log("[cron] warming seats cache");
    await axios.get(`${GATEWAY}/seats`, { timeout: 10000 });
  } catch (e) {
    console.error("[cron] warm error:", e.message);
  }
});

// Example maintenance: expire unpaid reserved tickets - placeholder
cron.schedule("0 */12 * * *", async () => {
  try {
    console.log("[cron] maintenance tick");
    // call internal endpoints or run DB cleanup
  } catch (e) {
    console.error("[cron] maintenance error:", e.message);
  }
});


// 0 → at minute 0

// */12 → every 12th hour

// * → any day

// * → any month

// * → any day of week