"use strict";

const Razorpay = require("razorpay");

function createClient() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
  });
}

module.exports = { createClient };
