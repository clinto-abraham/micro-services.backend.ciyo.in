"use strict";
require("./src/configs/env");

const app = require("./src/app");

const PORT = process.env.PORT || 4000;


const server = app.listen(PORT, () => {
  console.log(` 🚀 Mongo service running on ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down...");
  server.close(() => process.exit(0));
});

