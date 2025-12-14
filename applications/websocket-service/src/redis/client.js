"use strict";

const Redis = require("ioredis");
const { url } = require("../config/redis.config");

const pub = new Redis(url);
const sub = new Redis(url);
const redis = new Redis(url);

module.exports = { pub, sub, redis };
