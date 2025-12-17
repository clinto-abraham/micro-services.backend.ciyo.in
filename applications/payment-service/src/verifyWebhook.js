"use strict";

const crypto = require("crypto");

function verify(body, signature, secret) {
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return expected === signature;
}

module.exports = { verify };
