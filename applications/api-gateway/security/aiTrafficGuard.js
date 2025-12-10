"use strict";

// Simple token-bucket like guard for AI endpoint on gateway
let bucket = 20; // tokens per second * initial
const RATE = 10; // refill per second
setInterval(() => {
  bucket = Math.min(bucket + RATE, 100);
}, 1000);

module.exports = (req, res, next) => {
  try {
    if (req.path.includes("/ask-ai") || req.path.includes("/ai")) {
      if (bucket <= 0) return res.status(429).json({ error: "AI overloaded" });
      bucket--;
    }
    next();
  } catch (e) {
    next();
  }
};
