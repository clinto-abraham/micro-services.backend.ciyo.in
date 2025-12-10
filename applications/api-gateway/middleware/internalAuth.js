"use strict";

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.headers["x-internal-token"];
  if (!token) return res.status(401).json({ error: "Missing internal token" });
  try {
    jwt.verify(token, process.env.SERVICE_JWT_SECRET);
    next();
  } catch (e) {
    res.status(403).json({ error: "Invalid internal token" });
  }
};
