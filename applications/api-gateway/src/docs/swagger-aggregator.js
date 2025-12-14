const axios = require("axios");
const SwaggerParser = require("@apidevtools/swagger-parser");
const services = require("./services");

async function aggregateSwagger() {
  const merged = {
    openapi: "3.0.0",
    info: {
      title: "CIYO Enterprises API",
      version: "1.0.0"
    },
    paths: {},
    components: { schemas: {} }
  };

  for (const service of services) {
    const { data } = await axios.get(service.url);

    Object.entries(data.paths || {}).forEach(([path, def]) => {
      merged.paths[`${service.basePath}${path}`] = def;
    });

    merged.components.schemas = {
      ...merged.components.schemas,
      ...data.components?.schemas
    };
  }

  return SwaggerParser.validate(merged);
}

module.exports = aggregateSwagger;
