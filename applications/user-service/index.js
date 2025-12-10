"use strict";

require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const { pool, init } = require("./db");

const app = express();
app.use(express.json());

const PORT = parseInt(process.env.PORT || "3000", 10);
const JWT_SECRET = process.env.JWT_SECRET || "user_jwt_secret";
const SERVICE_JWT_SECRET = process.env.SERVICE_JWT_SECRET || "service_secret_example";

init().catch(err => { console.error("DB init failed", err); process.exit(1); });

app.get("/health", (req, res) => res.json({ ok: true, service: "user-service" }));

const regSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

app.post("/register", async (req, res) => {
  const { error, value } = regSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details.map(d => d.message) });
  const { name, email, password } = value;
  const hash = await bcrypt.hash(password, 12);
  const id = uuidv4();
  try {
    const r = await pool.query("INSERT INTO users(id,name,email,password) VALUES($1,$2,$3,$4) RETURNING id,name,email", [id, name, email, hash]);
    res.json({ user: r.rows[0] });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const loginSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });

app.post("/login", async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details.map(d => d.message) });
  const { email, password } = value;
  try {
    const r = await pool.query("SELECT id,name,email,password FROM users WHERE email=$1", [email]);
    const user = r.rows[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// internal user lookup - requires X-Internal-Token
app.get("/internal/users/:id", (req, res) => {
  const token = req.headers["x-internal-token"];
  try {
    jwt.verify(token, SERVICE_JWT_SECRET);
  } catch (e) {
    return res.status(403).json({ error: "Invalid internal token" });
  }
  pool.query("SELECT id,name,email FROM users WHERE id=$1", [req.params.id])
    .then(r => res.json(r.rows[0] || {}))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => console.log(`User service listening on ${PORT}`));
