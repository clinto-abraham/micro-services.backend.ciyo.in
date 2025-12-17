const createRedisClient = require("./redis.config");

module.exports = {
  connection: createRedisClient
};
