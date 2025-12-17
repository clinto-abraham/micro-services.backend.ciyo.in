const { Queue } = require("bullmq");
const config = require("../configs/bullmq");

exports.cronQueue = new Queue("cron-queue", config);

exports.registerCrons = async () => {
  await exports.cronQueue.add(
    "payment-reminder",
    { job: "PAYMENT_REMINDER" },
    { repeat: { cron: "0 9 * * *" }, attempts: 3 }
  );
};
