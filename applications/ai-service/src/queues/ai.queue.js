const { Queue } = require("bullmq");
const config = require("../config/queue.config");

module.exports = new Queue("ai-jobs", config);
