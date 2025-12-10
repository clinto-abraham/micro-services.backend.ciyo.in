"use strict";

require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const Redis = require("ioredis");
const Joi = require("joi");
const db = require("./db");
const Seat = require("./models/Seat");
const Ticket = require("./models/Ticket");

const app = express();
app.use(express.json());

const PORT = parseInt(process.env.PORT || "4000", 10);
const SERVICE_JWT_SECRET = process.env.SERVICE_JWT_SECRET || "service_secret_example";
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const CACHE_TTL = parseInt(process.env.CACHE_TTL || "60", 10);

const redis = new Redis(REDIS_URL);

(async () => { await db.connect(); })();

app.get("/health", (req, res) => res.json({ ok: true, service: "api-service" }));

const seatSchema = Joi.object({
  seatNumber: Joi.string().required(),
  row: Joi.string().required(),
  booker: Joi.string().allow("", null),
  status: Joi.string().valid("free", "booked")
});

// GET all seats (cached)
app.get("/seats", async (req, res) => {
  try {
    const cached = await redis.get("seats:all");
    if (cached) return res.json(JSON.parse(cached));
    const seats = await Seat.find().lean().limit(1000);
    await redis.setex("seats:all", CACHE_TTL, JSON.stringify(seats));
    res.json(seats);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Create seat (internal only)
app.post("/seats", async (req, res) => {
  const token = req.headers["x-internal-token"];
  try { jwt.verify(token, SERVICE_JWT_SECRET); } catch { return res.status(403).json({ error: "Invalid internal token" }); }
  const { error, value } = seatSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  try {
    const s = await Seat.create(value);
    await redis.del("seats:all");
    res.json(s);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Book seat (requires user JWT forwarded by gateway and internal token)
app.post("/book", async (req, res) => {
  const internal = req.headers["x-internal-token"];
  if (!internal) return res.status(401).json({ error: "Missing internal token" });
  try { jwt.verify(internal, SERVICE_JWT_SECRET); } catch { return res.status(403).json({ error: "Invalid internal token" }); }

  // user jwt is expected in Authorization header (Bearer)
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Missing user auth" });

  const { error, value } = seatSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  try {
    const seat = await Seat.findOne({ seatNumber: value.seatNumber, row: value.row });
    if (!seat) return res.status(404).json({ error: "Seat not found" });
    if (seat.status === "booked") return res.status(409).json({ error: "Seat already booked" });

    seat.status = "booked";
    seat.booker = "user"; // decode user id from user JWT in production
    await seat.save();

    // create ticket
    const ticket = await Ticket.create({
      showId: req.body.showId || null,
      seatId: seat.id,
      userId: "user",
      price: req.body.price || 0
    });

    await redis.del("seats:all");
    res.json({ ok: true, seat, ticket });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log(`API service running on ${PORT}`));
