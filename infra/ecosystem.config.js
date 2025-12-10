const path = require("path");

// Base directory where ecosystem file is located
const BASE = __dirname;
console.log(path.join(BASE, "../applications/gateway/index.js"))
module.exports = {
  apps: [
    {
      name: "gateway",
      script: path.join(BASE, "../applications/gateway/index.js"),
    },
    {
      name: "user-service",
      script: path.join(BASE, "../applications/user-service/index.js"),
    },
    {
      name: "api-service",
      script: path.join(BASE, "../applications/api-service/index.js"),
    },
    {
      name: "ai-service",
      script: path.join(BASE, "../applications/ai-service/index.js"),
    },
    {
      name: "websocket-service",
      script: path.join(BASE, "../applications/websocket-service/index.js"),
    },
    {
      name: "cron-service",
      script: path.join(BASE, "../applications/cron-service/index.js"),
    },
    {
      name: "payment-service",
      script: path.join(BASE, "../applications/payment-service/index.js"),
    }
  ]
};


// module.exports = {
//   apps: [
//     { name: "gateway", script: "../gateway/index.js", env: { PORT: 2000, SERVICE_JWT_SECRET: "service_secret_example" } },
//     { name: "user-service", script: "../user-service/index.js", env: { PORT: 3000 } },
//     { name: "api-service", script: "../api-service/index.js", env: { PORT: 4000 } },
//     { name: "ai-service", script: "../ai-service/index.js", env: { PORT: 5000 } },
//     { name: "websocket-service", script: "../websocket-service/index.js", env: { PORT: 6000 } },
//     { name: "cron-service", script: "../cron-service/index.js", env: { PORT: 7000 } },
//     { name: "payment-service", script: "../payment-service/index.js", env: { PORT: 8000 } }
//   ]
// };
