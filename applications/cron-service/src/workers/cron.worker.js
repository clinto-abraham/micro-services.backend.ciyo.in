const { Worker } = require("bullmq");
const jobs = require("../jobs/job.map");
const lock = require("../locks/redisLock");
const repo = require("../repositories/jobExecution.repo");
const { deadQueue } = require("../queues/deadletter.queue");
const config = require("../configs/bullmq");

new Worker(
  "cron-queue",
  async (job) => {
    const jobName = job.data.job;

    if (!(await lock.acquire(jobName))) return;

    const execId = repo.start(jobName);

    try {
      await jobs[jobName]();
      repo.success(execId);
    } catch (err) {
      repo.fail(execId, err);
      if (job.attemptsMade >= job.opts.attempts) {
        await deadQueue.add(jobName, job.data);
      }
      throw err;
    } finally {
      await lock.release(jobName);
    }
  },
  config
);
