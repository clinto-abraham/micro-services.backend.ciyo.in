"use strict";

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ShowSchema = new mongoose.Schema({
  id: { type: String, default: () => uuidv4(), index: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Show", ShowSchema);
