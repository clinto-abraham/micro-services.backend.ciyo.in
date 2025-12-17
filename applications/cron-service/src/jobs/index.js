const jobMap = require("./job.map");
const lock = require("../locks/redisLock");
const repo = require("../repositories/jobExecution.repo");

exports.run = async (jobName, payload = {}) => {
  const acquired = await lock.acquire(jobName);
  if (!acquired) return;

  const executionId = await repo.start(jobName);

  try {
    await jobMap[jobName](payload);
    await repo.success(executionId);
  } catch (err) {
    await repo.fail(executionId, err);
    throw err;
  } finally {
    await lock.release(jobName);
  }
};
