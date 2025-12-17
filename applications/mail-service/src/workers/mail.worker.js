"use strict";

const { Worker } = require("bullmq");
const createRedisClient = require("../configs/redis");
const mailService = require("../services/mail.service");
const sqlLog = require("../services/sql-log.service");
const mongoLog = require("../services/mongo-log.service");

const connection = createRedisClient();

new Worker(
  "mail-queue",
  async (job) => {
    const { to, subject, template, data } = job.data;
    const payload = { to, subject, template, data }

    await sqlLog.logMail({
      jobId: job.id,
      to,
      template,
      subject,
      status: "PROCESSING",
    });

    try {
      await mailService.sendTemplatedEmail(payload);

      await sqlLog.logMail({
        jobId: job.id,
        to,
        template,
        subject,
        status: "SENT"
      });

      await mongoLog.logEvent({
        jobId: job.id,
        payload,
        status: "SENT"
      });

    } catch (err) {
      await sqlLog.logMail({
        jobId: job.id,
        to,
        template,
        subject,
        status: "FAILED",
      });

      await mongoLog.logEvent({
        jobId: job.id,
        payload,
        status: "FAILED",
        error: err.message
      });

      throw err; // BullMQ retry
    }
  },
  { connection, concurrency: 5 }
);

console.log("📨 Mail worker running");






