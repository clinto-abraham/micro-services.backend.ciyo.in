const { JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } = require("./env");

module.exports = {
  secret: JWT_SECRET,
  accessToken: {
    expiresIn: JWT_EXPIRES_IN || "15m"
  },
  refreshToken: {
    expiresIn: JWT_REFRESH_EXPIRES_IN || "7d"
  }
};
