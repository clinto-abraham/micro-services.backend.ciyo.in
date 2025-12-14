"use strict";

const http = require("http");

function startHealthServer() {
  http.createServer((_, res) => {
    res.end("OK");
  }).listen(7000);
}

module.exports = { startHealthServer };
