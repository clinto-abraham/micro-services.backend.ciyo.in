const swaggerUi = require("swagger-ui-express");
const aggregateSwagger = require("./swagger-aggregator");

let cachedSpec = null;
let lastLoaded = 0;
const TTL = 60 * 1000; // 1 min

module.exports = async function setupSwagger(app) {
  app.use("/docs", async (req, res, next) => {
    if (!cachedSpec || Date.now() - lastLoaded > TTL) {
      cachedSpec = await aggregateSwagger();
      lastLoaded = Date.now();
    }
    swaggerUi.setup(cachedSpec)(req, res, next);
  }, swaggerUi.serve);
};
