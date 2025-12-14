"use strict";

const { createProxyMiddleware } = require("http-proxy-middleware");
const SERVICE_MAP = require("./service-map");

module.exports = (serviceKey) => {
  const service = SERVICE_MAP[serviceKey];

  if (!service) {
    throw new Error(`Unknown service: ${serviceKey}`);
  }

  return createProxyMiddleware({
    target: service.target,
    changeOrigin: true,
    pathRewrite: {
      [`^/${serviceKey}`]: ""
    },
    onProxyReq(proxyReq, req) {
      if (req.headers.authorization) {
        proxyReq.setHeader("Authorization", req.headers.authorization);
      }

      if (req.headers["x-request-id"]) {
        proxyReq.setHeader("X-Request-ID", req.headers["x-request-id"]);
      }
    }
  });
};
