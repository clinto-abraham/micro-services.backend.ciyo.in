"use strict";

const IORedis = require("ioredis");

function createPubSub(url) {
  const pub = new IORedis(url);
  const sub = new IORedis(url);
  return { pub, sub };
}

module.exports = { createPubSub };
