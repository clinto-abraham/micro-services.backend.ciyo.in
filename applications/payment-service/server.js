"use strict";
require("./src/configs/env");

console.log(
  "[BOOT]",
  "NODE_ENV =", process.env.NODE_ENV,
  "REDIS_PASSWORD =", process.env.REDIS_PASSWORD ? "SET" : "MISSING"
);

const app = require("./src/app");

const PORT = process.env.PORT || 8000;


const server = app.listen(PORT, () => {
  console.log(` 📨 Mail service running on ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down...");
  server.close(() => process.exit(0));
});
