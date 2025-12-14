module.exports = {
  secret: process.env.JWT_SECRET,
  accessToken: {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m"
  },
  refreshToken: {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d"
  }
};
