const path = require("path");

const BASE = __dirname;

/**
 * 🔒 Shared Redis configuration
 * Change Redis host/password ONCE here
 */
const REDIS_COMMON = {
  REDIS_HOST: "127.0.0.1",
  REDIS_PORT: 6379,
  REDIS_USERNAME: "default",
  REDIS_PASSWORD: "redisIsStartedOnDec15Of2025",
};

/**
 * ⚙️ Shared PM2 process stability config
 */
const COMMON_PROCESS = {
  watch: false,
  exec_mode: "fork",

  autorestart: true,
  min_uptime: "30s",
  max_restarts: 3,
  restart_delay: 5000,

  kill_timeout: 12000,
  listen_timeout: 5000,
};

module.exports = {
  apps: [
    {
      name: "api-gateway",
      script: path.join(BASE, "../applications/api-gateway/server.js"),
      instances: 1,
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 2000,
        REDIS_DB: 0,
        ...REDIS_COMMON,
      },
    },

    {
      name: "sql-service",
      script: path.join(BASE, "../applications/sql-service/server.js"),
      instances: 1,
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        REDIS_DB: 1,
        ...REDIS_COMMON,
      },
    },

    {
      name: "mongo-service",
      script: path.join(BASE, "../applications/mongo-service/server.js"),
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 4000,
        REDIS_DB: 2,
        ...REDIS_COMMON,
      },
    },

    {
      name: "ai-service",
      script: path.join(BASE, "../applications/ai-service/server.js"),
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5550,
        REDIS_DB: 3,
        ...REDIS_COMMON,
      },
    },

    {
      name: "websocket-service",
      script: path.join(BASE, "../applications/websocket-service/server.js"),
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 6000,
        REDIS_DB: 4,
        ...REDIS_COMMON,
      },
    },

    {
      name: "cron-service",
      script: path.join(BASE, "../applications/cron-service/server.js"),
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 7000,
        REDIS_DB: 5,
        ...REDIS_COMMON,
      },
    },

    {
      name: "payment-service",
      script: path.join(BASE, "../applications/payment-service/server.js"),
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8000,
        REDIS_DB: 6,
        ...REDIS_COMMON,
      },
    },

    {
      name: "mail-service",
      script: path.join(BASE, "../applications/mail-service/server.js"),
      ...COMMON_PROCESS,
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 9000,
        REDIS_DB: 7,
        ...REDIS_COMMON,
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
//       instances: 1,
//       kill_timeout: 12000,   // wait before force kill
//       listen_timeout: 5000,  // app must listen within this
//       autorestart: true,
//       max_restarts: 3,
//       restart_delay: 2000,
//       exec_mode: "fork",
//       env_development: {
//         NODE_ENV: "development"
//       },
//       env_production: {
//         NODE_ENV: "production",
//         PORT: 2000,
//         REDIS_HOST: "127.0.0.1",
//         REDIS_PORT: 6379,
//         REDIS_USERNAME: "default",
//         REDIS_PASSWORD: "redisIsStartedOnDec15Of2025",
//         REDIS_DB: 0
//       }
//     },
//     {
//       name: "sql-service",
//       script: path.join(BASE, "../applications/sql-service/server.js"),
//       watch: false,
//       kill_timeout: 12000,   // wait before force kill
//       listen_timeout: 5000,  // app must listen within this
//       autorestart: true,
//       max_restarts: 3,
//       restart_delay: 2000,
//       instances: 1,
//       exec_mode: "fork",
//       env_development: {
//         NODE_ENV: "development"
//       },
//       env_production: {
//         NODE_ENV: "production",
//         PORT: 3000,
//         REDIS_HOST: "127.0.0.1",
//         REDIS_PORT: 6379,
//         REDIS_USERNAME: "default",
//         REDIS_PASSWORD: "redisIsStartedOnDec15Of2025",
//         REDIS_DB: 1
//       }
//     },
//     {
//       name: "mongo-service",
//       script: path.join(BASE, "../applications/mongo-service/server.js"),
//       watch: false,
//       kill_timeout: 12000,   // wait before force kill
//       listen_timeout: 5000,  // app must listen within this
//       autorestart: true,
//       max_restarts: 3,
//       restart_delay: 2000,
//       env_development: {
//         NODE_ENV: "development"
//       },
//       env_production: {
//         NODE_ENV: "production",
//         PORT: 4000,
//         REDIS_HOST: "127.0.0.1",
//         REDIS_PORT: 6379,
//         REDIS_USERNAME: "default",
//         REDIS_PASSWORD: "redisIsStartedOnDec15Of2025",
//         REDIS_DB: 2
//       }
//     },
//     {
//       name: "ai-service",
//       script: path.join(BASE, "../applications/ai-service/server.js"),
//       watch: false,
//       kill_timeout: 12000,   // wait before force kill
//       listen_timeout: 5000,  // app must listen within this
//       autorestart: true,
//       max_restarts: 3,
//       restart_delay: 2000,
//       env_development: {
//         NODE_ENV: "development"
//       },
//       env_production: {
//         NODE_ENV: "production",
//         PORT: 5000,
//         REDIS_HOST: "127.0.0.1",
//         REDIS_PORT: 6379,
//         REDIS_USERNAME: "default",
//         REDIS_PASSWORD: "redisIsStartedOnDec15Of2025",
//         REDIS_DB: 3
//       }
//     },
//     {
//       name: "websocket-service",
//       script: path.join(BASE, "../applications/websocket-service/server.js"),
//       watch: false,
//       kill_timeout: 12000,   // wait before force kill
//       listen_timeout: 5000,  // app must listen within this
//       autorestart: true,
//       max_restarts: 3,
//       restart_delay: 2000,

//       env_development: {
//         NODE_ENV: "development"
//       },

//       env_production: {
//         NODE_ENV: "production",
//         PORT: 6000,
//         REDIS_HOST: "127.0.0.1",
//         REDIS_PORT: 6379,
//         REDIS_USERNAME: "default",
//         REDIS_PASSWORD: "redisIsStartedOnDec15Of2025",
//         REDIS_DB: 4
//       }
//     },
//     {
//       name: "cron-service",
//       script: path.join(BASE, "../applications/cron-service/server.js"),
//       watch: false,
//       kill_timeout: 12000,   // wait before force kill
//       listen_timeout: 5000,  // app must listen within this
//       autorestart: true,
//       max_restarts: 3,
//       restart_delay: 2000,
//       env_development: {
//         NODE_ENV: "development"
//       },
//       env_production: {
//         NODE_ENV: "production",
//         PORT: 7000,
//         REDIS_HOST: "127.0.0.1",
//         REDIS_PORT: 6379,
//         REDIS_USERNAME: "default",
//         REDIS_PASSWORD: "redisIsStartedOnDec15Of2025",
//         REDIS_DB: 5
//       }
//     },
//     {
//       name: "payment-service",
//       script: path.join(BASE, "../applications/payment-service/server.js"),
//       watch: false,
//       kill_timeout: 12000,   // wait before force kill
//       listen_timeout: 5000,  // app must listen within this
//       autorestart: true,
//       max_restarts: 3,
//       restart_delay: 2000,
//       env_development: {
//         NODE_ENV: "development"
//       },
//       env_production: {
//         NODE_ENV: "production",
//         PORT: 8000,
//         REDIS_HOST: "127.0.0.1",
//         REDIS_PORT: 6379,
//         REDIS_USERNAME: "default",
//         REDIS_PASSWORD: "redisIsStartedOnDec15Of2025",
//         REDIS_DB: 6
//       }
//     },
//     {
//       name: "mail-service",
//       script: path.join(BASE, "../applications/mail-service/server.js"),
//       watch: false,
//       kill_timeout: 12000,   // wait before force kill
//       listen_timeout: 5000,  // app must listen within this
//       autorestart: true,
//       max_restarts: 3,
//       restart_delay: 2000,
//       env_development: {
//         NODE_ENV: "development"
//       },
//       env_production: {
//         NODE_ENV: "production",
//         PORT: 9000,
//         REDIS_HOST: "127.0.0.1",
//         REDIS_PORT: 6379,
//         REDIS_USERNAME: "default",
//         REDIS_PASSWORD: "redisIsStartedOnDec15Of2025",
//         REDIS_DB: 7
//       }
//     },
//   ],
// };
