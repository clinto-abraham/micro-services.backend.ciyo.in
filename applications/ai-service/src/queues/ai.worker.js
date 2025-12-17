const { Worker } = require("bullmq");
const config = require("../configs/queue.config");
const aiService = require("../services/ai.service");

new Worker(
  "ai-jobs",
  async job => {
    return aiService.process(job.data);
  },
  config
);
