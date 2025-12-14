"use strict";

const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    seatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
      required: true
    },

    userId: {
      type: String,
      required: true
    },

    showId: {
      type: String,
      default: null
    },

    price: {
      type: Number,
      required: true
    },

    metadata: {
      type: Object,
      default: {}
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
