"use strict";

// Simple in-memory sliding-window spike detector (per IP)
// Not persistent; for production use redis-based counters

const WINDOW_MS = 3000;
const MAX_REQS = 30;
const map = new Map();

module.exports = (req, res, next) => {
  try {
    const ip = req.ip || req.connection.remoteAddress || "unknown";
    const now = Date.now();
    const arr = map.get(ip) || [];
    arr.push(now);
    // keep only last WINDOW_MS
    const filtered = arr.filter(t => now - t <= WINDOW_MS);
    map.set(ip, filtered);
    if (filtered.length > MAX_REQS) {
      return res.status(429).json({ error: "Spike detected" });
    }
    next();
  } catch (e) {
    next();
  }
};
