"use strict";

const axios = require("axios");

module.exports = axios.create({
  timeout: 5000,
  headers: {
    "x-internal-token": process.env.INTERNAL_SERVICE_TOKEN
  }
});
