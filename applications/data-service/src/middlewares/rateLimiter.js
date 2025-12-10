"use strict";

const rateLimit = require("express-rate-limit");

/**
 * Global API rate limiter
 * 
 * Helps protect against basic DDoS,
 * brute force attacks, and abusive API usage.
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,                 // limit each IP to 500 requests per window
  standardHeaders: true,    // Return rate limit info in headers
  legacyHeaders: false,     // Disable deprecated headers

  message: {
    success: false,
    message: "Too many requests, please try again later."
  }
});

module.exports = { apiLimiter };
