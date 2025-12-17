"use strict";

const url = require("url");

function authenticate(req) {
  const { query } = url.parse(req.url, true);

  // Example: ws://localhost:6000?userId=123
  const userId = query.userId;

  if (!userId) {
    throw new Error("Missing userId");
  }

  return {
    id: String(userId)
  };
}

module.exports = { authenticate };

