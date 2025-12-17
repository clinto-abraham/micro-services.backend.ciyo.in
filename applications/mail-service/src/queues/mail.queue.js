"use strict";

const { Queue } = require("bullmq");
const createRedisClient = require("../configs/redis");
const connection = createRedisClient();

module.exports = new Queue("mail-queue", { connection });

