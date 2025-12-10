"use strict";

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/ms_db" });

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
