"use strict";

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const TicketSchema = new mongoose.Schema({
  id: { type: String, default: () => uuidv4(), index: true },
  showId: { type: String, required: true, index: true },
  seatId: { type: String, required: true, index: true },
  userId: { type: String, required: true },
  status: { type: String, enum: ["reserved", "paid", "cancelled"], default: "reserved" },
  price: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Ticket", TicketSchema);
