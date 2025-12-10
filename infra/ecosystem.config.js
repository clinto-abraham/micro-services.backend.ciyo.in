const path = require("path");

// Base directory where ecosystem file is located
const BASE = __dirname;

module.exports = {
  apps: [
    {
      name: "api-gateway",
      script: path.join(BASE, "../applications/api-gateway/index.js"),
      watch: true,
    },
    {
      name: "user-service",
      script: path.join(BASE, "../applications/user-service/index.js"),
      watch: true,
    },
    {
      name: "data-service",
      script: path.join(BASE, "../applications/data-service/index.js"),
      watch: true,
    },
    {
      name: "ai-service",
      script: path.join(BASE, "../applications/ai-service/index.js"),
      watch: true,
    },
    {
      name: "websocket-service",
      script: path.join(BASE, "../applications/websocket-service/index.js"),
      watch: true,
    },
    {
      name: "cron-service",
      script: path.join(BASE, "../applications/cron-service/index.js"),
    },
    {
      name: "payment-service",
      script: path.join(BASE, "../applications/payment-service/index.js"),
      watch: true,
    }
  ]
};
