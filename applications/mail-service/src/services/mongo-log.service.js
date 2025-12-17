"use strict";

const axios = require("axios");
const { MONGO_SERVICE_BASE_URL } = require("../configs/env");

/**
 * Log full mail events & payloads
 * Used for debugging & retries
 */
exports.logEvent = async ({
  jobId,
  payload,
  status,
  error = null,
}) => {
  try {
    await axios.post(`${MONGO_SERVICE_BASE_URL}/mail/event`, {
      jobId,
      payload,
      status,
      error,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Mongo log failed:", err.message);
  }
};
