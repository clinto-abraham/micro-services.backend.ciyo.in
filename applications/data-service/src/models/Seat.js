"use strict";

const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  id: { type: String, default: () => uuidv4(), index: true },
  seatNumber: { type: String, required: true, unique: true },
  row: { type: String, required: true },
  booker: { type: String, default: null },
  status: {
    type: String,
    enum: ["available", "reserved", "blocked"],
    default: "available"
  },
  price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Seat", SeatSchema);
