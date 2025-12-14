"use strict";

const { Worker } = require("bullmq");
const connection = require("../config/redis");
const mailService = require("../services/mail.service");

new Worker(
  "mail-queue",
  async (job) => {
    const { to, subject, template, data } = job.data;

    await mailService.sendTemplatedEmail({
      to,
      subject,
      template,
      data,
    });
  },
  {
    connection,
    concurrency: 5,
  }
);

console.log("📨 Mail worker started");
