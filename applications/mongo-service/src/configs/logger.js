"use strict";

const { createLogger, format, transports } = require("winston");
const path = require("path");
const config = require("./index");

const logDir = path.join(process.cwd(), "logs");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), // show stack trace
    format.splat(),
    format.json()                   // log as JSON for production
  ),
  defaultMeta: {
    service: "data-service",
    environment: config.app.env
  },
  transports: [
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error"
    }),
    new transports.File({
      filename: path.join(logDir, "combined.log")
    })
  ]
});

// Show logs on console only in development
if (config.app.env === "development") {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp, stack }) => {
          return stack
            ? `${timestamp} [${level}] ${stack}`
            : `${timestamp} [${level}] ${message}`;
        })
      ),
    })
  );
}

module.exports = logger;
