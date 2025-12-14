const path = require("path");

const BASE = __dirname;

module.exports = {
  apps: [
    {
      name: "api-gateway",
      script: path.join(BASE, "../applications/api-gateway/server.js"),
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 2000
      },
    },
    {
      name: "sql-service",
      script: path.join(BASE, "../applications/sql-service/server.js"),
      watch: false,
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
    },
    {
      name: "mongo-service",
      script: path.join(BASE, "../applications/mongo-service/server.js"),
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 4000
      },
    },
    {
      name: "ai-service",
      script: path.join(BASE, "../applications/ai-service/server.js"),
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 5000
      },
    },
    {
      name: "websocket-service",
      script: path.join(BASE, "../applications/websocket-service/server.js"),
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 6000
      },
    },
    {
      name: "cron-service",
      script: path.join(BASE, "../applications/cron-service/server.js"),
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 7000
      },
    },
    {
      name: "payment-service",
      script: path.join(BASE, "../applications/payment-service/server.js"),
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 8000
      },
    },
    {
      name: "mail-service",
      script: path.join(BASE, "../applications/mail-service/server.js"),
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 9000
      },
    },
  ],
};





// const path = require("path");

// const BASE = __dirname;

// module.exports = {
//   apps: [
//     {
//       name: "api-gateway",
//       script: path.join(BASE, "../applications/api-gateway/server.js"),
//       watch: false,
//       env: {
//         NODE_ENV: "production",
//       },
//     },
//     {
//       name: "sql-service",
//       script: path.join(BASE, "../applications/sql-service/server.js"),
//       watch: false,
//       instances: "max",
//       exec_mode: "cluster",
//       env: {
//         NODE_ENV: "production",
//       },
//     },
//     {
//       name: "mongo-service",
//       script: path.join(BASE, "../applications/mongo-service/server.js"),
//       watch: false,
//       env: {
//         NODE_ENV: "production",
//       },
//     },
//     {
//       name: "ai-service",
//       script: path.join(BASE, "../applications/ai-service/server.js"),
//       watch: false,
//       env: {
//         NODE_ENV: "production",
//       },
//     },
//     {
//       name: "websocket-service",
//       script: path.join(BASE, "../applications/websocket-service/server.js"),
//       watch: false,
//       env: {
//         NODE_ENV: "production",
//       },
//     },
//     {
//       name: "cron-service",
//       script: path.join(BASE, "../applications/cron-service/server.js"),
//       watch: false,
//       env: {
//         NODE_ENV: "production",
//       },
//     },
//     {
//       name: "payment-service",
//       script: path.join(BASE, "../applications/payment-service/server.js"),
//       watch: false,
//       env: {
//         NODE_ENV: "production",
//       },
//     },
//     {
//       name: "mail-service",
//       script: path.join(BASE, "../applications/mail-service/server.js"),
//       watch: false,
//       env: {
//         NODE_ENV: "production",
//       },
//     },
//   ],
// };

