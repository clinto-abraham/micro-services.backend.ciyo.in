const JOBS = require("../constants/jobNames");

module.exports = {
  [JOBS.PAYMENT_REMINDER]: require("./payments.reminder.job"),
  [JOBS.INACTIVE_USERS]: require("./inactive.users.job")
};
