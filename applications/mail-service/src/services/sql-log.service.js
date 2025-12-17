"use strict";

const axios = require("axios");
const { SQL_SERVICE_BASE_URL } = require("../configs/env");


/**
 * Log email status to SQL service
 * Used for audit, billing, compliance
 */
exports.logMail = async ({
  jobId,
  to,
  template,
  subject,
  status,
  provider = "smtp",
}) => {
  try {
    await axios.post(`${SQL_SERVICE_BASE_URL}/mail/log`, {
      jobId,
      to,
      template,
      subject,
      status,
      provider,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    // IMPORTANT: do NOT crash mail worker because audit failed
    console.error("SQL log failed:", err.message);
  }
};
