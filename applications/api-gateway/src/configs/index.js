"use strict";

require("dotenv").config();
console.log(process.env.MONGO_URI, "process.env.MONGO_URI");

module.exports = {
  app: {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 2000
  },

  db: {
    uri: process.env.MONGO_URI
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET || "change_this_secret"
  },

  mail: {
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS
  }
};
