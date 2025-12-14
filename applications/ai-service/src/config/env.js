"use strict";

const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../../.env")
});

module.exports = {
  PORT: process.env.PORT || 9000,
  NODE_ENV: process.env.NODE_ENV || "development",
  INTERNAL_JWT_SECRET: process.env.INTERNAL_JWT_SECRET,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY
};
