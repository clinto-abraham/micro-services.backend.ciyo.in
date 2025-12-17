const jwt = require("jsonwebtoken");
const { INTERNAL_JWT_SECRET } = require("../configs/env");

module.exports = (req, res, next) => {
  const token = req.headers["x-internal-token"];
  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(token, INTERNAL_JWT_SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
};
