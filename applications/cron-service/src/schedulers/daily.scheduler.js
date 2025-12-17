const cron = require("node-cron");
const jobs = require("../jobs");

module.exports = () => {
  cron.schedule("0 2 * * *", async () => {
    await jobs.run("PAYMENT_REMINDER_DAILY");
  });
};
