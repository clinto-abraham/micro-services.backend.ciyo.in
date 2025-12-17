"use strict";

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD } = require("./env");

const common = {
  host: DB_HOST || "127.0.0.1",
  dialect: "postgres",
  logging: false,
};

module.exports = {
  development: {
    ...common,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres",
    logging: console.log
  },

  test: {
    ...common,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  stage: {
    ...common,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  production: {
    ...common,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres",
    logging: false
  },
};


