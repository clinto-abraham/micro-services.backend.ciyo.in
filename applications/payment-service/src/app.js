"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { createClient } = require("./razorpay");

const app = express();
app.use(bodyParser.json({ verify: (req, res, buf) => { req.rawBody = buf.toString(); } }));

module.exports = app;

