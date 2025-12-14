const jwt = require("jsonwebtoken");

exports.signAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m"
  });

exports.verifyToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);
