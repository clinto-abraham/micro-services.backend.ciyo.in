"use strict";
require("./src/configs/env");

console.log(
  "[BOOT]",
  "NODE_ENV =", process.env.NODE_ENV,
  "REDIS_PASSWORD =", process.env.REDIS_PASSWORD ? "SET" : "MISSING"
);

const app = require("./src/app");

const PORT = process.env.PORT || 9000;

const { registerCrons } = require("./src/queues/cron.queue");

registerCrons();

require("./src/workers/cron.worker");
require("./src/workers/deadletter.worker");

const server = app.listen(PORT, () => {
  console.log(` 📨 CRON service running on ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down...");
  server.close(() => process.exit(0));
});
