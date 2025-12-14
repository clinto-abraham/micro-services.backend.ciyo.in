"use strict";

const { Pool } = require("pg");

require("dotenv").config({ path: path.join(__dirname, "../.env") });



if (!process.env.DB_NAME) {
  throw new Error("DB_NAME is not set");
}

const pool = new Pool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: false,
});



async function init() {
  await pool.query(`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    CREATE TABLE IF NOT EXISTS users (
      id uuid PRIMARY KEY,
      name text,
      email text UNIQUE,
      password text,
      created_at timestamptz DEFAULT now()
    );
  `);
}

module.exports = { pool, init };
