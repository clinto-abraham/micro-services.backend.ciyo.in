"use strict";

const url = require("url");

function authenticate(req) {
  const { query } = url.parse(req.url, true);

  if (!query.userId) {
    throw new Error("Unauthorized");
  }

  return {
    id: query.userId
  };
}

module.exports = { authenticate };
