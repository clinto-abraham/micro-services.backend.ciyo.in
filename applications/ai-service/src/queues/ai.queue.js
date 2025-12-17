const { Queue } = require("bullmq");
const config = require("../configs/queue.config");

module.exports = new Queue("ai-jobs", config);
