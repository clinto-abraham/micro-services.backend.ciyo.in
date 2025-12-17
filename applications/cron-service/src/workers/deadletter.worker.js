const { Worker } = require("bullmq");
const config = require("../configs/bullmq");

new Worker(
  "dead-letter-queue",
  async (job) => {
    console.error("☠️ DEAD JOB:", job.name, job.data);
  },
  config
);
