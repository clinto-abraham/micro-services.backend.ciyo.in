"use strict";

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const SeatSchema = new mongoose.Schema({
  id: { type: String, default: () => uuidv4(), index: true },
  seatNumber: { type: String, required: true },
  row: { type: String, required: true },
  booker: { type: String, default: null },
  status: { type: String, enum: ["free", "booked"], default: "free" }
}, { timestamps: true });

module.exports = mongoose.model("Seat", SeatSchema);
