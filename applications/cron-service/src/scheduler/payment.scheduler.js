"use strict";

const cron = require("node-cron");
const { paymentQueue } = require("../queues/payment.queue");
const logger = require("../utils/logger");

/**
 * Runs every day at 9 AM
 * Finds pending payments and enqueues reminder jobs
 */
module.exports = () => {
  cron.schedule("0 9 * * *", async () => {
    logger.info("⏰ Payment reminder cron started");

    await paymentQueue.add(
      "SEND_PAYMENT_REMINDER",
      {},
      {
        jobId: `payment-reminder-${Date.now()}`
      }
    );

    logger.info("📨 Payment reminder job enqueued");
  });
};
