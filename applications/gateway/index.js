"use strict";

const express = require("express");
const helmet = require("helmet");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const Redis = require("ioredis");
const redis = new Redis();

const spikeProtector = require("./security/spikeProtector");
const aiTrafficGuard = require("./security/aiTrafficGuard");
const limiter = require("./security/rateLimiter");

const PORT = parseInt(process.env.PORT || "2000", 10);
const SERVICE_JWT_SECRET = process.env.SERVICE_JWT_SECRET || "service_secret_example";
const USER_SVC = process.env.USER_SVC || "http://localhost:3000";
const API_SVC = process.env.API_SVC || "http://localhost:4000";
const AI_SVC = process.env.AI_SVC || "http://localhost:5000";
const PAYMENT_SVC = process.env.PAYMENT_SVC || "http://localhost:8000";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(spikeProtector);
app.use(aiTrafficGuard);

// generate short-lived internal token for service-to-service auth
function internalToken() {
  return jwt.sign({ svc: "gateway" }, SERVICE_JWT_SECRET, { expiresIn: "5m" });
}

// app.get("/health", (req, res) => res.json({ ok: true, service: "gateway" }));
app.get("/health", async (req, res) => {
  const axiosConfig = { timeout: 3000 };

  const results = {
    gateway: { ok: true },

    services: {},
    databases: {}
  };

  // --------- SERVICE HEALTH CHECKS ----------
  const serviceList = {
    user: process.env.USER_SVC || "http://localhost:3000",
    api: process.env.API_SVC || "http://localhost:4000",
    ai: process.env.AI_SVC || "http://localhost:5000",
    websocket: "http://localhost:6000",
    payment: process.env.PAYMENT_SVC || "http://localhost:8000"
  };

  for (const [name, url] of Object.entries(serviceList)) {
    try {
      const r = await axios.get(`${url}/health`, axiosConfig);
      results.services[name] = { ok: true, service: r.data.service };
    } catch (e) {
      results.services[name] = { ok: false, error: e.message };
    }
  }

  // --------- DATABASE HEALTH CHECKS ----------
  // Redis check
  try {
    const redisCheck = await redis.ping();
    results.databases.redis = { ok: redisCheck === "PONG" };
  } catch (e) {
    results.databases.redis = { ok: false, error: e.message };
  }

  // MongoDB health
  try {
    const mongoose = require("mongoose");
    const state = mongoose.connection.readyState;
    const mongoStates = ["disconnected", "connected", "connecting", "disconnecting"];
    results.databases.mongodb = {
      ok: state === 1,
      state: mongoStates[state]
    };
  } catch (e) {
    results.databases.mongodb = { ok: false, error: e.message };
  }

  // Postgres health
  try {
    const { Pool } = require("pg");
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    await pool.query("SELECT 1");
    results.databases.postgres = { ok: true };
  } catch (e) {
    results.databases.postgres = { ok: false, error: e.message };
  }

  // Final status code
  const statusCode =
    Object.values(results.services).some(s => !s.ok) ||
    Object.values(results.databases).some(db => !db.ok)
      ? 500
      : 200;

  res.status(statusCode).json(results);
});


// User flows (proxy)
app.post("/register", async (req, res) => {
  try {
    const r = await axios.post(`${USER_SVC}/register`, req.body);
    res.json(r.data);
  } catch (e) {
    res.status(e?.response?.status || 500).json({ error: e?.response?.data || e.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const r = await axios.post(`${USER_SVC}/login`, req.body);
    res.json(r.data);
  } catch (e) {
    res.status(e?.response?.status || 500).json({ error: e?.response?.data || e.message });
  }
});

// Public seats read (cached at api-service)
app.get("/seats", async (req, res) => {
  try {
    const r = await axios.get(`${API_SVC}/seats`);
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Book seat (requires user auth forwarded + internal token)
app.post("/book", async (req, res) => {
  try {
    const userAuth = req.headers.authorization;
    if (!userAuth) return res.status(401).json({ error: "Missing Authorization" });

    const r = await axios.post(`${API_SVC}/book`, req.body, {
      headers: { Authorization: userAuth, "X-Internal-Token": internalToken() },
      timeout: 10000
    });
    res.json(r.data);
  } catch (e) {
    res.status(e?.response?.status || 500).json({ error: e?.response?.data || e.message });
  }
});

// AI proxy
app.post("/ask-ai", async (req, res) => {
  try {
    const r = await axios.post(`${AI_SVC}/ai`, req.body, {
      headers: { "X-Internal-Token": internalToken() },
      timeout: 20000
    });
    res.json(r.data);
  } catch (e) {
    res.status(e?.response?.status || 500).json({ error: e?.response?.data || e.message });
  }
});

// Payment proxy
app.post("/pay", async (req, res) => {
  try {
    const r = await axios.post(`${PAYMENT_SVC}/pay`, req.body, {
      headers: { "X-Internal-Token": internalToken() },
      timeout: 15000
    });
    res.json(r.data);
  } catch (e) {
    res.status(e?.response?.status || 500).json({ error: e?.response?.data || e.message });
  }
});

app.listen(PORT, () => console.log(`Gateway running on ${PORT}`));
