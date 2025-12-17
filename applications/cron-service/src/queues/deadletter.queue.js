const { Queue } = require("bullmq");
const config = require("../configs/bullmq");

exports.deadQueue = new Queue("dead-letter-queue", config);
