"use strict";

const Seat = require("../models/Seat");

class SeatService {
  async createSeat(data) {
    return Seat.create(data);
  }

  async getSeats() {
    return Seat.find();
  }

  async getSeatById(id) {
    return Seat.findById(id);
  }

  async updateSeat(id, data) {
    return Seat.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteSeat(id) {
    return Seat.findByIdAndDelete(id);
  }
}

module.exports = new SeatService();
