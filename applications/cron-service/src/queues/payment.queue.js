"use strict";

const { Queue } = require("bullmq");
const redis = require("../config/redis.config");

const PAYMENT_QUEUE = "payment-reminder-queue";

const paymentQueue = new Queue(PAYMENT_QUEUE, {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 3000 },
    removeOnComplete: true,
    removeOnFail: false
  }
});

module.exports = {
  paymentQueue,
  PAYMENT_QUEUE
};
