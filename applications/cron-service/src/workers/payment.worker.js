"use strict";

const { Worker } = require("bullmq");
const redis = require("../config/redis.config");
const { PAYMENT_QUEUE } = require("../queues/payment.queue");
const sendReminderJob = require("../jobs/payment/sendReminder.job");
const logger = require("../utils/logger");

const worker = new Worker(
  PAYMENT_QUEUE,
  async (job) => {
    logger.info(`⚙️ Processing job: ${job.name}`);

    switch (job.name) {
      case "SEND_PAYMENT_REMINDER":
        await sendReminderJob(job.data);
        break;

      default:
        logger.warn(`⚠️ Unknown job: ${job.name}`);
    }
  },
  { connection: redis }
);

worker.on("completed", (job) => {
  logger.info(`✅ Job completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
  logger.error(`❌ Job failed: ${job.id}`, err);
});

module.exports = worker;
